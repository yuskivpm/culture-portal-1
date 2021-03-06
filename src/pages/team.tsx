import React from 'react';
import { graphql } from 'gatsby';
import thisTranslate from '../components/useTranslations';
import { Figure, Alert, Container, Row, Col, Badge } from 'react-bootstrap';
import Head from '../components/Head';
import { sectionTitle } from '../styles/PersonFullView.module.scss';
import '../styles/index.scss';

interface Data {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        developers: Developer[];
      };
    };
  };
}

interface Developer {
  name: string;
  github: string;
  avatar: string;
  role: string;
}

const developerCard = (developer: Developer, index: number) => {
  const { roleDev, techLead } = thisTranslate();
  const role = developer.github === 'yuskivpm' ? techLead : roleDev;
  return (
    <Col key={index} md={4} sm={6} xs={12}>
      <Badge variant="secondary">{role}</Badge>
      <Figure className="text-center">
        <Figure.Image
          width={300}
          src={developer.avatar}
          alt="No avatar...)"
          rounded
        />
        <Figure.Caption>
          <Alert variant="danger">
            <h4>{developer.name}</h4>
            <Alert.Link href={`https://github.com/${developer.github}`}>
              {developer.github}
            </Alert.Link>
          </Alert>
        </Figure.Caption>
      </Figure>
    </Col>
  );
};

export default ({ data }: Data) => {
  const { developers, title } = data.markdownRemark.frontmatter;
  return (
    <div>
      <Head title={title} />
      <h2 className={sectionTitle}>{title}</h2>
      <Container>
        <Row>
          <Col xs={1} sm={1} md={1} lg={2} />
          <Col>
            <Row className="justify-content-center teamContainer">
              {developers.map(developerCard)}
            </Row>
          </Col>
          <Col xs={1} sm={1} md={1} lg={2} />
        </Row>
      </Container>
    </div>
  );
};

export const query = graphql`
  query Team($locale: String!) {
    markdownRemark(fields: { locale: { eq: $locale }, slug: { eq: "team" } }) {
      frontmatter {
        title
        developers {
          name
          github
          avatar
        }
      }
    }
  }
`;
