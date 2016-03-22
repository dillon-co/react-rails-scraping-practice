// import TimerMixin from 'react-timer-mixin';

class Links extends React.Component {
    constructor(props, content){
      super(props, content);
      this.state = {initialLinks: (this.props.initialLinks || "")}
    }

    componentDidMount(){
      setInterval(this.updateLinks.bind(this), 25)
    }

  updateLinks(){
    $.get({
      url: window.location.origin+'/get_all_links', 
      success: function(data){
        this.setState({initialLinks: data})
      }.bind(this)
    })
  }

  tick(){
    // this.updateLinks.bind(this)
    console.log('meow');
  }

  render () {
    var links = this.state.initialLinks.map(function(link){
      return (
        <IPLink key={link.id} ipLink={link} />
      );
    });

    
    return(
      <div className="links">
        <div>
          {links.reverse()}
        </div>  
      </div>
    )
  }
}

      
class IPLink extends React.Component{
  constructor(props){
    super(props)
    this.state = {dataRendered: false, allReviews: []}
    this.deleteLink = this.deleteLink.bind(this)
  }


  fetchReviews() {
    var scraper_url = this.props.ipLink.text
    var all_the_data = $.get({
      url: window.location.origin+'/fetch_review_data', 
      data: {scraper_url: scraper_url},
      success: function(data){
        if (this.state.dataRendered == false){ 
          this.setState({allReviews: data,
                       dataRendered: true});
        }else {
          this.setState({allReviews: [],
                        dataRendered: false})
        }
      }.bind(this)
    });
  } 


    deleteLink(){
      var scraperUrl = this.props.ipLink.text
      var allData = $.ajax({
        type: 'DELETE',
        url: window.location.origin+'/delete_link',
        data: {scraper_url: scraperUrl}, 
      })
    }


  render(){
      var reviews = this.state.allReviews.map(function(review){
        return(
          <Review key={review.id} review={review} />
        )
      })

    return(
      <div className="container jumbotron">
        <div>
          <h2>{this.props.ipLink.company}</h2>
          <h3>{this.props.ipLink.average_stars} star average rating</h3> 
      
        </div>
        <div>
          <button className="btn btn-primary col-mid-2" onClick={this.fetchReviews.bind(this)}>show / hide reviews!</button>
          <button className="btn btn-warning col-mid-4" onClick={this.deleteLink}>Delete</button>
          <div>
          <br></br>
          </div>
          {reviews}
        </div>
      </div>
    );
  }
}

class Review extends React.Component{
  render(){
    return(
      <div className="panel" style={{'backgroundColor': 'white'}}>
        <div className="container">
          <h3>{this.props.review.author}</h3>
          <h3>{this.props.review.rating} stars.</h3>
          <p>{this.props.review.description}</p>
        </div>
      </div>
    )
  }
}

// Links.propTypes = {
//   text: React.PropTypes.string,
//   company: React.PropTypes.string,
//   averageStars: React.PropTypes.node
// };