class Reviews extends React.Component{
  constructor(props, content){
    super(props, content)
  }

  fetch_reviews() {
    var scraper_url = this.props.thing.text
    var all_the_data = $.get(window.location.host+'/fetch_review_data', {scraper_url: scraper_url})
    console.log(all_the_data)
  }

  render(){


  }
}