'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle } from 'lucide-react'

const shapes = [
  { name: 'circle', icon: '●', bg: 'bg-red-400' },
  { name: 'square', icon: '■', bg: 'bg-blue-400' },
  { name: 'triangle', icon: '▲', bg: 'bg-green-400' },
  { name: 'star', icon: '★', bg: 'bg-yellow-400' },
]

interface ShapeItem {
  id: number
  shape: typeof shapes[0]
}

export default function ShapeSortingGame() {
  const [items, setItems] = useState<ShapeItem[]>([])
  const [slots, setSlots] = useState<typeof shapes[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string, isCorrect: boolean } | null>(null)
  const [selectedItem, setSelectedItem] = useState<ShapeItem | null>(null)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const gameShapes = shapes.slice(0, 4)
    const newItems = gameShapes.map((shape, index) => ({ id: index, shape }))
    const newSlots = [...gameShapes].sort(() => Math.random() - 0.5)
    setItems(newItems)
    setSlots(newSlots)
    setScore(0)
    setGameOver(false)
    setFeedback(null)
    setSelectedItem(null)
  }

  const handleItemClick = (item: ShapeItem) => {
    setSelectedItem(item)
  }

  const handleSlotClick = (targetShape: typeof shapes[0]) => {
    if (!selectedItem) return

    if (selectedItem.shape.name === targetShape.name) {
      setItems(items.filter(i => i.id !== selectedItem.id))
      setScore(score + 1)
      setFeedback({ message: "Correct! Great job!", isCorrect: true })
      if (items.length === 1) {
        setGameOver(true)
        triggerConfetti()
      }
    } else {
      setFeedback({ message: "Oops! Try again!", isCorrect: false })
      shakeAnimation()
    }
    setSelectedItem(null)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const shakeAnimation = () => {
    const gameArea = document.getElementById('shape-game-area')
    if (gameArea) {
      gameArea.classList.add('shake')
      setTimeout(() => gameArea.classList.remove('shake'), 500)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Shape Sorting Adventure</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl">Score: {score}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">How to Play</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Play Shape Sorting Adventure</DialogTitle>
              <DialogDescription>
                1. Click on a colored shape to select it.<br/>
                2. Then click on the matching shape outline.<br/>
                3. Match all shapes correctly to win the game.<br/>
                4. If you make a mistake, you can try again!<br/>
                Have fun and learn your shapes!
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div id="shape-game-area" className="mb-8">
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {slots.map((shape, index) => (
            <motion.div
              key={index}
              className={`w-24 h-24 rounded-lg border-4 border-dashed ${shape.bg} flex items-center justify-center text-4xl text-white/50 cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSlotClick(shape)}
            >
              {shape.icon}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className={`w-24 h-24 rounded-full shadow-lg ${item.shape.bg} flex items-center justify-center text-3xl text-white cursor-pointer ${selectedItem?.id === item.id ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleItemClick(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.shape.icon}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-xl font-bold mb-4 ${feedback.isCorrect ? 'text-green-500' : 'text-red-500'}`}
          >
            {feedback.message}
            {feedback.isCorrect ? <CheckCircle className="inline ml-2" /> : <XCircle className="inline ml-2" />}
          </motion.div>
        )}
      </AnimatePresence>
      {gameOver && (
        <motion.div
          className="mt-8 text-2xl font-bold text-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎉 Congratulations! You matched all the shapes! 🎉
        </motion.div>
      )}
      <motion.button
        onClick={startNewGame}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        New Game
      </motion.button>
    </div>
  )
}

