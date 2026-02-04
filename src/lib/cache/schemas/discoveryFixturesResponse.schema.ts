import { z } from "zod";
import { DiscoverFixtureSchema } from "./discoveryFixture.schema";

export const DiscoveryFixturesResponseSchema = z.array(DiscoverFixtureSchema);
export type DiscoveryFixturesResponse = z.infer<
  typeof DiscoveryFixturesResponseSchema
>;