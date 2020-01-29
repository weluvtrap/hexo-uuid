'use strict';

const uuid = require('uuid');
const fs = require('fs');

module.exports.newPost = (post) => {

  let lines = post.content.split('\n');
  let index = lines.findIndex(item => item === 'guid:');
  if (index > -1) {
    lines[index] += (' ' + uuid.v1());
  } else {
    lines.splice(1, 0, 'guid: ' + uuid.v1());
  }

  post.content = lines.join('\n');
  if (post.path !== false) {
    fs.writeFile(post.path, post.content, () => {});
  }

};

module.exports.before_renderPost = (post) => {
  if (post.layout == 'post' && (!post.guid || post.guid == '')) {
    let lines = post.raw.split('\n');
    let index = lines.findIndex(item => item === 'guid:');
    post.guid = uuid.v1();
    if (index > -1) {
      lines[index] += (' ' + post.guid);
    } else {
      lines.splice(1, 0, 'guid: ' + post.guid);
    }

    post.raw = lines.join('\n');
    fs.writeFile(post.full_source, post.raw, () => { });
  }
};
