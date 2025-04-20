const data = [
  {
    type: "Experience",
    title: "Experience",
    description: "Experience",
    image: "Experience",
    subjects: [
      {
        id: 'e1',
        chapter: "Space",
        name: "Solar System",
        link: "http://localhost:3000/api/mrfiles?filename=solar.html",
        image: '/images/Solar_System.jpg',
        description: "In this lecture students can join the session and see first person point of view of solar system and different planets",
      },
      {
        id: 'e2',
        chapter: "Space",
        name: "Planetary Motion",
        image: '/images/planet_motion.jpg',
        link: "http://localhost:3000/api/mrfiles?filename=planet-motion.html",
        description: "In this lecture students can join the session and see first person point of view of solar system and different planets",
      },
      {
        id: 'e3',
        chapter: "Space",
        name: "Eclipse Occurrence",
        image: '/images/eclipse.jpg',
        link: "http://localhost:3000/api/mrfiles?filename=eclipse.html",
        description: "In this lecture students can join the session and see first person point of view of solar system and different planets",
      },
      {
        id: 'e4',
        chapter: "Space",
        name: "AR View : Earth",
        image: '/images/earth.jpg',
        link: "http://localhost:3000/api/mrfiles?filename=earth.html",
        description: "In this lecture students can join the session and see first person point of view of solar system and different planets",
      },
      {
        id: 'e5',
        chapter: "Space",
        name: "Skeletal System",
        image: '/images/skeletal_system.jpg',
        description: "In this lecture students can join the session and see first person point of view of skeletal system and different bones",
        link: "http://localhost:3000/api/mrfiles?filename=skeletal-system.html"
      },
      {
        id: 'e6',
        chapter: "Space",
        name: "Heart",
        image: '/images/heart.jpg',
        description: "In this lecture students can join the session and see first person point of view of heart and different parts of heart",
        link: "http://localhost:3000/api/mrfiles?filename=heart.html"
      },
    ]
  },
  {
    type: "Lectures",
    title: "Lectures",
    description: "Lectures",
    image: "Lectures",
    subjects: [
      {
        id: 'l1',
        name: "General",
        image: '/images/mr-class.jpeg',
        description: "In this lecture students can join the session add attain their daily lectures remotely via VR-AR technology",
        contents: [
          "Introduction to miXed reality",
          "The miXed reality",
          "The miXed reality",
          "The miXed reality",
          "The miXed reality",
          "The miXed reality"
        ],
        joinLink: "http://localhost:3000/api/mrfiles?filename=lecture-duplex.html"
      }
    ]
  },
]

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ classrooms: data })
  }
  if (req.method === 'POST') {
    const { id } = req.body
    let tempArray = [...data[0].subjects, ...data[1].subjects]
    const newClassroom = tempArray.filter((sub) => sub.id === id)
    res.status(200).json({ classroom: newClassroom })
  }
}
