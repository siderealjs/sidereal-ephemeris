const storedBodies = ["mars", "earth"] as const;

export type BodyName = (typeof storedBodies)[number];
