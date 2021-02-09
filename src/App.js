import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm'
import moment from 'moment'
import loading from './loading.gif'

const App = () => {
  const [articles, setArticles] = useState([])
  const [term, setTerm] = useState('everything')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`
        )
        const articles = await response.json()
        console.log(articles.response.docs)
        setArticles(articles.response.docs)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchArticles()
  }, [term])

  return (
    <>
      <div className="showcase">
        <div className="overlay">
          <h1 className="text-white font-bold text-4xl mb-4 lg:text-6xl">
            Viewing articles about {term}
          </h1>
          <SearchForm searchText={(text) => setTerm(text)} />
        </div>
      </div>

      {isLoading ? (
        <img src={loading} alt="Loading..." />
      ) : (
        <section className="grid grid-cols-1 gap-10 px-5 py-10 pb-20 lg:w-1/2 lg:mx-auto 2xl:w-2/3">
          {articles.map((article, index) => {
            const {
              abstract,
              web_url,
              lead_paragraph,
              pub_date,
              news_desk,
              section_name,
              byline: { original },
              word_count,
            } = article

            return (
              <article key={index} className="bg-white py-5 px-5 rounded-lg">
                <h3 className="font-bold text-xl lg:text-4xl">{abstract}</h3>
                <p className="text-justify my-3">{lead_paragraph}</p>
                <p>
                  {original}, {moment(`${pub_date}`).format('Do MMM YYYY')}
                </p>
                <ul>
                  <li>Desk: {news_desk}</li>
                  <li>Section: {section_name}</li>
                </ul>
                <a href={web_url} target="_blank">
                  Web Resource
                </a>
                <small className="block mt-4">Word Count: {word_count}</small>
              </article>
            )
          })}
        </section>
      )}
    </>
  )
}

export default App
