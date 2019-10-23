import { UPLOAD_POST, FETCH_POSTS } from './types';
import { db, time } from '../utils/firebase';

export const fetchPosts = () => dispatch => {
  db.collection('posts').orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};

export const fetchPostsByTopic = (query) => dispatch => {
  query = query.toLowerCase();
  db.collection('posts').where('topics', 'array-contains', query).orderBy('createdAt', 'desc').limit(10).get()
    .then(function (snapshot) {
      if (snapshot.empty) {
        return;
      }

      let posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      })

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    }.bind(dispatch));
};

export const likePost = (post) => {
  const { author, createdAt, text, likes } = post;
  if (likes.indexOf(localStorage.getItem('uid')) === -1) {
    likes.push(localStorage.getItem('uid'));
  }

  db.collection('posts').where('author', '==', author)
    .where('createdAt', '==', createdAt)
    .where('text', '==', text).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        db.collection('posts').doc(doc.id).set({
          likes: likes
        }, { merge: true })
      })
    })
};

export const uploadPost = (text, topics) => dispatch => {
  let user = JSON.parse(localStorage.getItem('user'))

  topics = topics.map(function (topic) {
    return topic.toLowerCase();
  })

  let post = {
    text: text,
    displayName: user.displayName,
    author: user.username,
    authorPic: user.photoUrl,
    createdAt: time.now().toDate(),
    topics: topics,
    likes: [user.username]
  };

  db.collection('posts').add(post);

  dispatch({
    type: UPLOAD_POST,
    payload: post
  })
};
