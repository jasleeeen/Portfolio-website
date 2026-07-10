const domains = [
  {
    id: 1,
    slug: "computer-vision",
    title: "Computer Vision",
    subtitle: "Observe",
    accent: "#3ba7ff",

    badge: "01",

    description:
      "Teaching machines to interpret images, videos and visual scenes through detection, segmentation, recognition and understanding.",

    keywords: [
      "YOLO",
      "OpenCV",
      "CNN",
      "Segmentation",
      "Detection",
      "Retina",
      "Landmarks",
    ],

    stats: [
      {
        label: "Inference",
        value: "12 ms",
      },
      {
        label: "Models",
        value: "YOLO",
      },
      {
        label: "Focus",
        value: "Vision",
      },
    ],
  },

  {
    id: 2,
    slug: "deep-learning",
    title: "Deep Learning",
    subtitle: "Learn",
    accent: "#9c6cff",

    badge: "02",

    description:
      "Designing neural architectures capable of learning complex representations from massive datasets.",

    keywords: [
      "PyTorch",
      "Attention",
      "Transformers",
      "Gradient",
      "Epoch",
      "CUDA",
      "Training",
    ],

    stats: [
      {
        label: "Layers",
        value: "128+",
      },
      {
        label: "Loss",
        value: "0.014",
      },
      {
        label: "GPU",
        value: "CUDA",
      },
    ],
  },

  {
    id: 3,
    slug: "reconstruction",
    title: "3D Reconstruction",
    subtitle: "Reconstruct",
    accent: "#34d6ff",

    badge: "03",

    description:
      "Turning ordinary videos into immersive 3D scenes using point clouds, camera poses and Gaussian Splatting.",

    keywords: [
      "NeRF",
      "COLMAP",
      "Gaussian",
      "Point Cloud",
      "Mesh",
      "Depth",
      "SLAM",
    ],

    stats: [
      {
        label: "Points",
        value: "214K",
      },
      {
        label: "Frames",
        value: "850",
      },
      {
        label: "Mesh",
        value: "Ready",
      },
    ],
  },

  {
    id: 4,
    slug: "multimodal",
    title: "Multimodal AI",
    subtitle: "Understand",
    accent: "#ff9d42",

    badge: "04",

    description:
      "Combining images, language and structured data into shared embedding spaces for richer intelligence.",

    keywords: [
      "CLIP",
      "Embeddings",
      "Image",
      "Text",
      "Fusion",
      "Alignment",
      "RAG",
    ],

    stats: [
      {
        label: "Dimensions",
        value: "768",
      },
      {
        label: "Modalities",
        value: "4",
      },
      {
        label: "Vector DB",
        value: "Active",
      },
    ],
  },

  {
    id: 5,
    slug: "agentic",
    title: "Agentic AI",
    subtitle: "Reason",
    accent: "#40e38d",

    badge: "05",

    description:
      "Building autonomous AI systems capable of planning, remembering, reasoning and using tools.",

    keywords: [
      "LangGraph",
      "Planner",
      "Memory",
      "Agents",
      "RAG",
      "Tools",
      "Reasoning",
    ],

    stats: [
      {
        label: "Memory",
        value: "Online",
      },
      {
        label: "Planning",
        value: "Enabled",
      },
      {
        label: "Tools",
        value: "Connected",
      },
    ],
  },
];

export default domains;