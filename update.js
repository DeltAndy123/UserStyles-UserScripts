const stylus = require('stylus');
const axios = require('axios');
const fs = require('fs');

/** Steps for Google Classroom Dark Theme:
 * 1. Fetch the UserStyles.world CSS from "https://userstyles.world/api/style/1728.user.css"
 * 2. Save the file to "./Google Classroom Dark Theme/classroom-dark.user.css"
 * 3. Parse the Stylus CSS into vanilla CSS and save it to "./Google Classroom Dark Theme/classroom-dark.css"
 */

axios
  .get('https://userstyles.world/api/style/1728.user.css')
  .then((response) => {
    fs.writeFileSync('./Google Classroom Dark Theme/classroom-dark.user.css', response.data);
    
    var stylusCss = response.data
      .replace(/@-moz-document regexp\("\^\(https\?\):\/\/ogs\.google\.\*"\)\s+{(.|\n)*/gm, '') // Remove the second @-moz-document block
      .replace(/(?:\/\* ==UserStyle==(\n|.)*?(?=@var)|==\/UserStyle== \*\/)/gm, '') // Remove the extra unneeded meta
      .replace(/@var\s+\w+\s+(\w+)\s+".*?"\s+(.*)/gm, '$1 = $2;') // Replace @var with variable assignment
      .replace(/@-moz-document domain\("classroom\.google\.com"\) {((?:\n|.)*)}/gm, '$1') // Remove the @-moz-document block but keep the CSS

    stylus(stylusCss)
      .render((err, css) => {
        if (err) throw err;

        fs.writeFileSync('./Google Classroom Dark Theme/classroom-dark.css', css);

      });
  });