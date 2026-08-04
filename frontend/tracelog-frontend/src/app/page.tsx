import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import IntegrationsSection from '@/components/landing/IntegrationsSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'
import LogTerminal from '@/components/landing/LogTerminal'
import LiveTopology from '@/components/landing/LiveTopology'
import PlatformTabs from '@/components/landing/PlatformTabs'
import IntegrationBash from '@/components/landing/IntregrationsBash'
import CapabilitiesSection from '@/components/landing/CapabilitiesSection'

export default function Home() {
    return (
        <main style={{ background: '#000000', color: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

				<Navbar />
				<HeroSection />
				<LogTerminal />
				<LiveTopology />
				<StatsSection />
				<PlatformTabs />
				<CapabilitiesSection />
				<FeaturesSection />
				<IntegrationsSection />
				<IntegrationBash />
				<FAQSection />
				<Footer />

    </main>
	)
}
