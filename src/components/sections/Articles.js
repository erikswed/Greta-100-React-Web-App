import React, { Component } from "react";
import Article from "../elements/Article";
import Resume from "../../resume.json";

class Articles extends Component {
  constructor(props) {
    super();
    this.state = { articles: [] };
  }

  componentDidMount() {
    // "date": "18-08-20",
    // "title": "Test Article",
    // "url1": "",
    // "url2": "",
    // "cover_image": "https://www.bbc.com/news/science-environment-53477604",
    // "description": "2018-08-27"
    let articles = [];
    {Resume.article.map((element, index) => {
      articles.push(
        <div className="column" key={index}>
          <Article
            key={index}
            title={element.title}
            url={element.url1}
            image={element.cover_image}
            extract={element.description}
          />
        </div>
      );
    });
    // Hard coded for 4 columns
    var offset = 4 - Resume.article.length;
    for (var i = 0; i < 0; i++) {
      articles.push(<div className="column"></div>);
    }
    this.setState({ articles: articles });
    }
  }

    // componentDidMount() {
  //   const devTo = "https://dev.to/api/articles?username=jcoelho";
  //   // "date": "18-08-20",
  //   // "title": "Test Article",
  //   // "url1": "",
  //   // "url2": "",
  //   // "cover_image": "https://www.bbc.com/news/science-environment-53477604",
  //   // "description": "2018-08-27"
  //   fetch(devTo)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       let articles = [];
  //       data = data.slice(0, 4);
  //       data.forEach((element, index) => {
  //         articles.push(
  //           <div className="column" key={index}>
  //             <Article
  //               key={index}
  //               title={element.title}
  //               url={element.url1}
  //               image={element.cover_image}
  //               extract={element.description}
  //             />
  //           </div>
  //         );
  //       });
  //       var offset = 4 - data.length;
  //       for (var i = 0; i < offset; i++) {
  //         articles.push(<div className="column"></div>);
  //       }
  //       this.setState({ articles: articles });
  //     });
  // }

  render() {
    return (
      <section className="section" id="articles">
        <div className="container">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle is-4">My latest articles</h2>
          <div className="columns">{this.state.articles}</div>
        </div>
      </section>
    );
  }
}

export default Articles;
