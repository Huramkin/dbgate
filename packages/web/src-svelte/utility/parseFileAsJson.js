export async function parseFileAsJson(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error',
    };
  }
}
