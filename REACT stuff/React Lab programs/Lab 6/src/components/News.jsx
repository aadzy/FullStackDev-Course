const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Fnatic signs a new coach:",
      content: "Fnatic has announced the signing of a new head coach, aiming to revamp their strategies for the upcoming Masters tournament. Fans are eager to see how this shift will impact the team's performance and synergy on the international stage."
    },
    {
      id: 2,
      title: "VCT adds Oceania region to 2026 circuit:",
      content: "Riot Games has confirmed that the Oceania region will be included in the 2026 Valorant Champions Tour, providing more opportunities and regional slots for emerging teams from Australia and New Zealand."
    },
    {
      id: 3,
      title: "Esports officially recognized as a medal sport in 2026 Asian Games.",
      content: "The Olympic Council of Asia has announced that esports will be a medal event at the 2026 Asian Games, marking a significant milestone for competitive gaming and its athletes across the continent."
    }
  ]

  return (
    <section className="p-12 bg-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
      <ul className="list-disc pl-5 space-y-2">
        {newsItems.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <article className="mt-1">
              {item.content}
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default News 