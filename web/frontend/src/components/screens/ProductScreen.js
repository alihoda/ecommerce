import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import axios from "axios";

import Rating from "../Rating";

function ProductScreen({ match }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    }

    fetchProduct();
  }, []);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        {/* Image col */}
        <Col md={7}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        {/* Cart and product detail col */}
        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <span>Price:</span>
                <span>${product.price}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>Status:</span>
                <span>
                  {product.countInStock > 0 ? "In stock" : "Out of stock"}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex flex-column">
                <Button
                  className="btn-light"
                  type="button"
                  disabled={product.countInStock == 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="my-3">
        <Col md={7}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>Brand:</span>
                <span>{product.brand}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>Price:</span>
                <span>${product.price}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
