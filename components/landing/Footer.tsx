import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#00BFA5] text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Groomic</h3>
          <p className="text-teal-50">Bringing people together through music.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="#features" className="text-teal-50 hover:text-white transition-colors">Features</Link></li>
            <li><Link href="#how-it-works" className="text-teal-50 hover:text-white transition-colors">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Twitter</Link></li>
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Facebook</Link></li>
            <li><Link href="#" className="text-teal-50 hover:text-white transition-colors">Instagram</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-teal-400 text-center text-teal-50">
        <p>&copy; {new Date().getFullYear()} Groomic. All rights reserved.</p>
      </div>
    </footer>
  )
}

