// class NewLink extends React.Component {
//   constructor(props, content){
//     super(props, content);
//    this.state = {initialLink: this.props.initialLink}
//   }

//   render(){
//     var reviews = this.state.initialLink.map(function(review){
//       <LinkReviews key={review.id} review={review} />
//     })
//     return(
//       <div className="all-reviews">
//         {reviews}
//       </div>
//     ); 
//   }
// }


// class LinksReviews extends React.Component {
//   render(){
//     return(
//       <div className="link-reviews">
//         <h3>{this.prop.review.author}</h3>
//         <h2>{this.prop.review.rating}</h2>
//         <p>{this.prop.review.description}</p>
//       </div>
//     );
//   }
// }