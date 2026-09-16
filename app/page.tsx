import { Navbar } from "@/components/sections/Navbar";
import { HeroDrop } from "@/components/sections/HeroDrop";
import { DropShowcase } from "@/components/sections/DropShowcase";
import { LookbookGallery } from "@/components/sections/LookbookGallery";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/sections/Footer";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { CartDrawer } from "@/components/ui/CartDrawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] py-4 sm:py-8 px-3 sm:px-6 lg:px-10 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-[#FCFBFA] rounded-3xl sm:rounded-[36px] border border-[#E5E0D8] shadow-[0_8px_30px_rgba(40,30,20,0.06)] p-4 sm:p-8 md:p-12 transition-all">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroDrop />

        {/* Catalog Showcase */}
        <DropShowcase />

        {/* Lookbook Gallery */}
        <LookbookGallery />

        {/* Brand Manifesto */}
        <BrandManifesto />

        {/* FAQ Section */}
        <FaqSection />

        {/* Bento Footer */}
        <Footer />
      </div>

      {/* Global Modals & Drawers */}
      <QuickViewModal />
      <CartDrawer />
    </main>
  );
}
