require_relative '../workers/crawling_worker'

class LinksController < ApplicationController

  def show
    @link = Link.find(params[:id])
  end
  
  def new
    @link = Link.new
    @links = Link.all
  end

  def create
    link = Link.new(link_params)
    
    unless link.save
      render :error
    end  
  end  

  def delete_link
    scraper_url = params[:scraper_url]
    link = Link.find_by(text: scraper_url)
    Link.delete(link)
  end  

  def get_all_links
    links = Link.all
    links 
    respond_to do |format|
      format.json{ render json: links } 
    end  
  end  

  def index
    @links = Link.all
  end

  def fetch_review_data
    scraper_url = params[:scraper_url]
    puts scraper_url
    url = Link.find_by(text: scraper_url)
    reviews = url.reviews
    reviews
    respond_to do |format|
      format.json{ render json: reviews }
    end
  end  

  def call_crawling_worker
    scrapper_url = params[:scrapper_url]
    link = Link.where(text: scrapper_url).first_or_create
    # CrawlingWorker.perform_async(link.id)
    Link.find(link.id).crawl_link_and_set_values
    respond_to do |format|
      format.js { render nothing: true}
    end  
  end

  private

  def link_params
    params.require(:link).permit(:text, :review_count, :average_stars)
  end  
end
