export const fetchLocation = async () => {
  const response = await fetch("http://ip-api.com/json/?fields=country");
  const location = await response.json();
  return location.country;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v2/all?fields=name"
    );
    if (!response.ok) {
      console.error(
        "Failed to fetch countries:",
        response.status,
        response.statusText
      );
      return [];
    }

    const result = await response.json();
    if (Array.isArray(result)) {
      // v2 returns { name: string }[]
      // but we need { name: { common: string } } to match your UI
      // so we map it into the v3 shape:
      return result.map((c: { name: string }) => ({
        name: { common: c.name },
      }));
    }

    console.error("Unexpected countries format:", result);
    return [];
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page, location } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  // Construct query parameters properly
  const queryParams = new URLSearchParams({
    query: query || "Software Engineer",
    page: page?.toString() || "1",
    ...(location && { location }), // Only add location if it exists
  });

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?${queryParams}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data || [];
};
