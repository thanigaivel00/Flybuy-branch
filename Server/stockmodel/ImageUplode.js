    var mongodb = require('mongodb');
    var mongoClient = mongodb.MongoClient;
    var fs = require('fs');
    var db = null;
    var img = null;
    var url = 'mongodb://localhost:27017';
    const uploadimage = ((id, productname) => {
        mongoClient.connect(url, function(err, clients) {
            if (err) {
                console.log('Sorry unable to connect to MongoDB Error:', err);
            } else {
                db = clients.db('BranchInfo');
                var bucket = new mongodb.GridFSBucket(db);
                var pathname = './uploads/' + productname;
                fs.createReadStream(pathname).pipe(
                    bucket.openUploadStreamWithId(id)).on('error', function(error) {
                    console.log('Error:-', error);
                }).on('finish', function() {
                    fs.unlinkSync(pathname);
                });
            }
        });
    });
    const getimage = ((id) => {
        mongoClient.connect(url, function(err, clients) {
            if (err) {
                console.log('Sorry unable to connect to MongoDB Error:', err);
            } else {
                db = clients.db('BranchInfo');
                var bucket = new mongodb.GridFSBucket(db);
                var pathname = './uploads/' + id + '.jpg';
                bucket.openDownloadStream(id)
                    .pipe(fs.createWriteStream(pathname))
                    .on('error', function(error) {
                        console.log('Error:-', error);
                    }).on('finish', function() {
                        console.log("Done");
                    });
            }
        });

    });
    module.exports = { uploadimage, getimage }