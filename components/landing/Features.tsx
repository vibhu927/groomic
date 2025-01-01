import { Music, Users, Globe } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: <Music className="h-12 w-12 text-[#00BFA5]" />,
      title: "Create Streams",
      description: "Start your own music stream and curate the perfect playlist for any occasion."
    },
    {
      icon: <Users className="h-12 w-12 text-[#FF5722]" />,
      title: "Invite Friends",
      description: "Easily invite friends to join your stream and enjoy music together in real-time."
    },
    {
      icon: <Globe className="h-12 w-12 text-[#FFC107]" />,
      title: "Discover Streams",
      description: "Explore and join public streams to discover new music and connect with others."
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-zinc-800 mb-3">{feature.title}</h3>
              <p className="text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

