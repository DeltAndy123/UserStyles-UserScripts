const stylus = require('stylus');
const axios = require('axios');
const fs = require('fs');

// Steps for Google Classroom Dark Theme:
// 1. Fetch the UserStyles.world CSS from "https://userstyles.world/api/style/1728.user.css"
// 2. Save the file to "./Google Classroom Dark Theme/classroom-dark.user.css"
// 3. Parse the Stylus CSS into vanilla CSS and save it to "./Google Classroom Dark Theme/classroom-dark.css"
axios
  .get('https://userstyles.world/api/style/1728.user.css')
  .then((response) => {
    fs.writeFileSync('./Google Classroom Dark Theme/classroom-dark.user.css', response.data);
    
    var stylusCss = response.data
      .replace(/@-moz-document regexp\("\^\(https\?\):\/\/ogs\.google\.\*"\)\s*{[\S\s]*}/, '') // Remove the second @-moz-document block
      .replaceAll(/(?:\/\* ==UserStyle==[\S\s]*?(?=@var)|==\/UserStyle== \*\/)/gm, '') // Remove the extra unneeded meta
      .replaceAll(/@var\s+\w+\s+([\w-]+)\s+".*?"\s+(.*)/gm, '$1 = $2;') // Replace @var with variable assignment
      .replaceAll(/@-moz-document domain\("classroom\.google\.com"\) {([\S\s]*)}/gm, '$1') // Remove the @-moz-document block but keep the CSS
      
    fs.writeFileSync('./Google Classroom Dark Theme/classroom-dark.styl', stylusCss)

    stylus(stylusCss)
      .render((err, css) => {
        if (err) throw err;

        fs.writeFileSync('./Google Classroom Dark Theme/classroom-dark.css', css);

      });
  });

// Same thing for Classroom Dark V2, but ID is 12025
axios
  .get('https://userstyles.world/api/style/12025.user.css')
  .then((response) => {
    fs.writeFileSync('./classroom_dark_v2/classroom-dark.user.css', response.data);
    
    var stylusCss = response.data
      .replaceAll(/(?:\/\* ==UserStyle==[\S\s]*?(?=@var)|==\/UserStyle== \*\/)/gm, '') // Remove the extra unneeded meta
      .replaceAll(/@var\s+\w+\s+([\w-]+)\s+".*?"\s+(.*)/gm, '$1 = $2;') // Replace @var with variable assignment
      .replaceAll(/@-moz-document domain\("classroom\.google\.com"\) {([\S\s]*)}/gm, '$1') // Remove the @-moz-document block but keep the CSS

    fs.writeFileSync('./classroom_dark_v2/classroom-dark.styl', stylusCss)

    stylus(stylusCss)
      .render((err, css) => {
        if (err) throw err;

        fs.writeFileSync('./classroom_dark_v2/classroom-dark.css', css);

      });
  });