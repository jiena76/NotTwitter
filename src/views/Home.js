/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  Button
} from "shards-react";

const Home = () => (
  /* Home page, welcomes users */

  <Container fluid className="main-content-container h-100 px-4">
    <Row noGutters className="h-100">
      <Col lg="3" md="5" className="mx-auto my-auto">
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
      </Col>
    </Row>
  </Container>
);

export default Home;
