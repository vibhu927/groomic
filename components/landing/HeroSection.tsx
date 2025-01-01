import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#E0F2F1] to-white py-24">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Stream Music Together
        </h1>
        <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
          Create streams, invite friends, and enjoy music in perfect harmony. Groomic brings people together through the power of shared musical experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-[#00BFA5] hover:bg-[#00ACC1] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white text-lg px-8 py-6 rounded-xl transition-colors"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  )
}

