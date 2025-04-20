// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json([
        {
            "id": 1,
            "imageLocation": "/mrassets/niranjan-gltf.gltf",
        },
        {
            "id": 2,
            "imageLocation": "/images/niranjant.glb",
        }
    ])
}
