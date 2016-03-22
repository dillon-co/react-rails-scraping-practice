class NewLinkWithReviews extends React.Component {

  constructor(props, content){
    super(props, content);
    this.state = {initialLink: this.props.initialLink}
    this.addLink = this.addLink.bind(this)
    // this.state.HyperLink = ""
  }

  addLink(e){
    var scraper_url = $('#link-text').val();
    if (scraper_url.split('.')[1] === "insiderpages"){ 
      console.log (scraper_url);
      $.post(window.location.origin+'/call_crawling_worker', {scrapper_url: scraper_url})
    }else{
      alert("That's not a valid link! You need to use a review page from www.insiderpages.com")
    }  
  }

  setHyperLink(e){
    console.log($('#link-text').val());
  }

  render () {


    return (
      <div>
        <div> 
          <input type="text" style={{"minWidth": "300px"}} placeholder="InsiderPages URL goes here" onChange={this.setHyperLink} id="link-text"/>
        </div>
        <div>
          <br/><button className="btn btn-primary" onClick={this.addLink}>Add This Link</button>
        </div>
      </div>
    );
  }
}


// NewLinkWithReviews.propTypes = {
//   url: React.PropTypes.string,
//   reviewAuthor: React.PropTypes.string,
//   reviewRating: React.PropTypes.node,
//   reviewDescription: React.PropTypes.node
// };
