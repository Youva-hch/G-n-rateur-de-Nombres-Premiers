import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import Background from '../components/Background'
import GlassCard from '../components/ui/GlassCard'

/**
 * Home page - Page d'accueil améliorée
 */
export const Index = () => {
  return (
    
      <section className="relative min-h-screen w-full">
        <Background/>
        <div className="relative z-[100] w-full px-4 py-16 md:py-24" style={{ transform: 'translateZ(0)' }}>
          <div className="max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <GlassCard
                icon="⚡"
                title="Génération Rapide"
                description="Générez des nombres premiers aléatoirement avec un algorithme optimisé qui garantit une performance maximale même pour les grands nombres."
              />
              <GlassCard
                icon="✓"
                title="Vérification Instantanée"
                description="Vérifiez en temps réel si un nombre est premier grâce à notre algorithme de vérification ultra-rapide et précis."
              />
              <GlassCard
                icon="📊"
                title="Historique Complet"
                description="Consultez l'historique de toutes vos opérations pour suivre vos découvertes et recherches de nombres premiers."
              />
              <GlassCard
                icon="🎨"
                title="Interface Moderne"
                description="Une interface intuitive, responsive et élégante qui rend l'exploration des nombres premiers agréable et simple."
              />
              <GlassCard
                icon="🔒"
                title="Validation Sécurisée"
                description="Système de validation robuste qui garantit la cohérence des données et évite les erreurs de saisie."
              />
              <GlassCard
                icon="⚙️"
                title="Algorithmes Optimisés"
                description="Utilisez les meilleurs algorithmes mathématiques pour des résultats précis et des performances exceptionnelles."
              />
            </div>
          </div>
        </div>
      </section>

  )
}
