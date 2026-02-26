import { describe, it, expect } from "vitest";
import { loader } from "./jobs";
import { initialJobOffers } from "~/context/cv-context";

// Mock Request object
function createRequest(url: string) {
  return new Request(url);
}

describe("Jobs Loader", () => {
  it("returns all jobs when no filters are applied", async () => {
    const request = createRequest("http://localhost:3000/jobs");
    const response = await loader({ request, params: {}, context: {} } as any);
    
    expect(response.jobs).toHaveLength(initialJobOffers.length);
    expect(response.filters.q).toBe("");
  });

  it("filters jobs by search query (case insensitive)", async () => {
    // Assuming initialJobOffers has a job with title "Product Marketing Manager"
    const query = "marketing";
    const request = createRequest(`http://localhost:3000/jobs?q=${query}`);
    const response = await loader({ request, params: {}, context: {} } as any);
    
    const expectedJobs = initialJobOffers.filter(j => 
      j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query)
    );
    
    expect(response.jobs).toHaveLength(expectedJobs.length);
    expect(response.jobs[0].title).toMatch(/Marketing/i);
  });

  it("filters jobs by location", async () => {
    const location = "Paris";
    const request = createRequest(`http://localhost:3000/jobs?location=${location}`);
    const response = await loader({ request, params: {}, context: {} } as any);
    
    const expectedJobs = initialJobOffers.filter(j => j.location === location);
    
    expect(response.jobs).toHaveLength(expectedJobs.length);
    expect(response.jobs.every(j => j.location === location)).toBe(true);
  });

  it("filters jobs by contract type", async () => {
    const contract = "cdi";
    const request = createRequest(`http://localhost:3000/jobs?contract=${contract}`);
    const response = await loader({ request, params: {}, context: {} } as any);
    
    const expectedJobs = initialJobOffers.filter(j => j.contract === contract);
    
    expect(response.jobs).toHaveLength(expectedJobs.length);
    expect(response.jobs.every(j => j.contract === contract)).toBe(true);
  });
});
