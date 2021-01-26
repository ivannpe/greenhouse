// Toolkit Class for static toolkit site with info to take care of plant
const fs = require('fs');

class toolkit{
    constructor(subject, image, details, learnmore){
        this.subject = subject;
        this.image = image;
        this.details = details;
        this.learnmore = learnmore;
    }
}

module.exports = {
    toolkit: toolkit,
    //reads files using readdir and readfile. gets content from file and parses as a json
    readFiles(dirname, onFileContent) {
        fs.readdir(dirname, function(err, filenames) {
          if (err) {
            throw(err);
            return;
          }
          filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
              if (err) {
                throw(err);
                return;
              }
              onFileContent(JSON.parse(content));
            });
          });
        });
      }
}