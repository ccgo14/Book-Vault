export default function About() {
  const features = [
    {
      icon: "🔍",
      title: "Discovery Engine",
      description: "Real-time search across millions of volumes powered by the Open Library API.",
    },
    {
      icon: "❤️",
      title: "Personal Vault",
      description: "Save your favorite finds to a persistent personal library for future reference.",
    },
    {
      icon: "📖",
      title: "Reading Status",
      description: "Track your progress by marking books as 'Want to Read' or 'Completed'.",
    },
    {
      icon: "🛡️",
      title: "Data Persistence",
      description: "Your library is managed via a dedicated local REST API for speed and reliability.",
    },
  ];

  const team = [
    { name: "Caleb", role: "Director & Navigation" },
    { name: "Calvin", role: "Library & Data Display" },
    { name: "Roy", role: "UI/UX & Routing" },
    { name: "Adrian", role: "API Integration" },
    { name: "Lynclyne", role: "QA & Documentation" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream/10 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-4x1 shadow-lg p-10 text-center mb-10 border border-brand-stone/5">
          <h1 className="text-5xl font-bold mb-4 italic font-serif text-brand-stone">📖 BookVault</h1>
          <p className="text-brand-stone/60 text-lg max-w-2xl mx-auto font-medium">
            Your personal digital library where discovering, saving, 
            and organizing books becomes simple and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-md flex items-start gap-5 border border-brand-stone/5 hover:scale-[1.01] transition-transform">
              <span className="text-4xl">{feature.icon}</span>
              <div>
                <h3 className="font-bold text-xl text-brand-stone mb-1">{feature.title}</h3>
                <p className="text-brand-stone/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-stone italic font-serif">The Curators</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 text-center shadow-md border border-brand-stone/10"
              >
                <div className="w-16 h-16 rounded-full bg-brand-stone/5 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-brand-stone">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-brand-stone">{member.name}</h3>
                <p className="text-brand-stone/40 text-[10px] uppercase font-bold tracking-wider mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

       
        <div className="bg-white rounded-4x1 shadow-md p-8 text-center mb-10 border border-brand-stone/5">
          <h2 className="text-2xl font-bold mb-6 text-brand-stone">Architectural Foundation</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 18', 'Vite', 'JSON Server', 'Open Library API', 'Tailwind CSS'].map(
              (tech, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-brand-stone/5 rounded-full font-medium text-brand-stone border border-brand-stone/10"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}