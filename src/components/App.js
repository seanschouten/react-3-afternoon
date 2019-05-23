import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

import Axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    Axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState ({ posts: results.data});
    })
  }

  updatePost( id, text ) {
    console.log(id,text)
    Axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id}`, { text }).then( results => {
      this.setState ({ posts: results.data });
    }
    )
  }

  deletePost( id ) {
    Axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results=> {
      this.setState({ posts: results.data });
    });

  }

  createPost( text ) {
    Axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( post => (
              <Post key={ post.id } 
                    text={ post.text}
                    id={post.id}
                    date={ post.date }
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost } />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
