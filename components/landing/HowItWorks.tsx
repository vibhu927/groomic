export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your Groomic account in seconds.",
      color: "bg-[#00BFA5]"
    },
    {
      number: "2",
      title: "Create a Stream",
      description: "Start a new music stream and add your favorite tracks.",
      color: "bg-[#FF5722]"
    },
    {
      number: "3",
      title: "Invite Friends",
      description: "Share your stream link with friends or make it public.",
      color: "bg-[#FFC107]"
    },
    {
      number: "4",
      title: "Enjoy Together",
      description: "Listen, chat, and enjoy music in perfect sync.",
      color: "bg-[#00ACC1]"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-[#E0F2F1]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <div className={`${step.color} text-white rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-6 text-xl font-bold`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-zinc-800 mb-3">{step.title}</h3>
              <p className="text-zinc-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

