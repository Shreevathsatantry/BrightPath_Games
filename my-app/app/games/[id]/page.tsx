'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import ColorMatchingGame from '@/components/games/ColorMatchingGame'
import EmotionRecognitionGame from '@/components/games/EmotionRecognitionGame'
import ShapeSortingGame from '@/components/games/ShapeSortingGame'
import MusicalPatternsGame from '@/components/games/MusicalPatternsGame'
import MemoryCardGame from '@/components/games/MemoryCardGame'
import WordFormationGame from '@/components/games/WordFormationGame'
import GrammarDetectiveGame from '@/components/games/GrammarDetectiveGame'
import BasicArithmeticGame from '@/components/games/BasicArithmeticGame'
import ShapePatternGame from '@/components/games/ShapePatternGame'

export default function GamePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const renderGame = () => {
    switch (params.id) {
      case 'color-matching':
        return <ColorMatchingGame />
      case 'emotion-recognition':
        return <EmotionRecognitionGame />
      case 'shape-sorting':
        return <ShapeSortingGame />
      case 'musical-patterns':
        return <MusicalPatternsGame />
      case 'memory-card':
        return <MemoryCardGame />
      case 'word-formation':
        return <WordFormationGame />
      case 'grammar-detective':
        return <GrammarDetectiveGame />
      case 'basic-arithmetic':
        return <BasicArithmeticGame />
      case 'shape-pattern':
        return <ShapePatternGame />
      default:
        return <div>Game not found</div>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8"
      >
        {renderGame()}
        <div className="mt-8 text-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Games
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

