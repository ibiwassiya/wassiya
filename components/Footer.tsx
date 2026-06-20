import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max">
        <div className="footgrid">
          <div>
            <div className="footbrand">Wasi<span>yya</span></div>
            <p className="footdesc">UK&apos;s first Faraid-compliant Islamic estate planning platform. Solicitor-reviewed. Scholar-validated.</p>
          </div>
          <div>
            <div className="footcolt">Platform</div>
            <Link href="/" className="footlink">Home</Link>
            <Link href="/how-it-works" className="footlink">How it works</Link>
            <Link href="/pricing" className="footlink">Pricing</Link>
            <Link href="/start" className="footlink">Start my will</Link>
          </div>
          <div>
            <div className="footcolt">Professionals</div>
            <Link href="/for-advisors" className="footlink">For advisors</Link>
            <Link href="/for-mosques" className="footlink">For mosques</Link>
            <Link href="/solicitor" className="footlink">Solicitor portal</Link>
            <Link href="/advisor" className="footlink">Advisor dashboard</Link>
          </div>
          <div>
            <div className="footcolt">Company</div>
            <Link href="/about" className="footlink">About us</Link>
            <Link href="/privacy" className="footlink">Privacy policy</Link>
            <Link href="/terms" className="footlink">Terms of service</Link>
            <Link href="/login" className="footlink">Sign in</Link>
          </div>
        </div>
        <div className="footbot">
          <p className="footlegal">&copy; 2025 Wasiyya Ltd. Registered in England &amp; Wales. Will writing is not regulated by the FCA. Trust creation and power of attorney services are provided by our SRA-regulated solicitor partners.</p>
          <div className="footbadges">
            <span className="footbadge">ICO Registered</span>
            <span className="footbadge">SRA Regulated</span>
            <span className="footbadge">UK GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
