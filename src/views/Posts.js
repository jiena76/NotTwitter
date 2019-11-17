/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPostsByTopics, fetchPostsByTopic, likePost, deletePost } from '../actions/postActions';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button,
  Badge
} from "shards-react";


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: this.props.topic
    }

    if (this.props.topic) {
      this.props.fetchPostsByTopic(this.props.topic)
    }
    else {
      this.props.fetchPostsByTopics();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.topic === nextProps.topic) {
      return;
    }

    if (nextProps.topic) {
      this.props.fetchPostsByTopic(nextProps.topic)
    }
    else {
      this.props.fetchPostsByTopics();
    }
  }

  render() {
    const { posts } = this.props;    return (
      <div>
        {posts.map((post) => {
          const { author, authorPic, text, likes } = post;
          console.log(post);
          const liked = likes.indexOf(localStorage.getItem('uid')) !== -1;
          return (
            /* Main contains Feed */
            <Card small className="h-100 mb-3">
              {/* Card Header */}
              <CardHeader className="border-bottom d-flex flex-column">
                <Row className="px-3">

                  <Col lg="12" sm="1" className="user-teams__image my-auto p-0">
                    <img className="rounded" src={authorPic} alt={author} />
                  </Col>
                  <Col className="user-teams__info pl-3">
                    <h5 className="m-0"><Link to={'/u/' + author}> {'@' + author}</Link></h5>
                    <h6 className="text-bold">{text}</h6>
                  </Col>
                  <Col>
                    <Button onClick={() => deletePost(post)}
                            className="px-2 py-1 float-right btn btn-outline-secondary border-0 btn-small">
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>

              </CardHeader>
              <CardBody className="d-flex flex-column">
                <Row>
                  <Col sm='6' md='7' lg='8'>
                <Form className="quick-post-form">

                  {/* Body */}
                  <FormGroup className="m-0">
                    {
                      post.topics.map((tag, idx) => (
                        <Badge
                          pill
                          theme="light"
                          className="text-light text-uppercase mb-0 border mr-1"
                          key={idx}
                        ><Link to={'/t/' + tag}>
                          {tag}
                          </Link>
                        </Badge>
                      ))
                    }
                    
                  </FormGroup>
                </Form>
                
                </Col>
                <Col sm='6' md="5" lg='4'>
                  <Button onClick={() => likePost(post)} theme='light' pill className="ml-auto">{likes.length} <span>{liked ? '❤️' : '♡' }</span></Button>
                </Col>
                </Row>
              </CardBody>
            </Card>
          )
        })}
      </div>
    )
  }
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps, { fetchPostsByTopics, fetchPostsByTopic, likePost })(Posts);
