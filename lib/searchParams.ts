export const updateUrlParams = (newParams: Record<string, string>) => {
  // Get current scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Get the current URL
  const location = window.location;
  const currentUrl = new URL(location.href);

  // Update the URL with new query parameters
  Object.keys(newParams).forEach((key) => {
    currentUrl.searchParams.set(key, newParams[key]);
  });

  // Use history.pushState or history.replaceState to update the URL without reloading
  window.history.pushState({}, "", currentUrl.toString());

  // Restore the scroll position
  window.scrollTo(scrollX, scrollY);
};

export const removeUrlParam = (param: string) => {
  // Get the current scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Get the current URL
  const location = window.location;
  const currentUrl = new URL(location.href);

  // Remove the specified query parameter
  currentUrl.searchParams.delete(param);

  // Use history.pushState or history.replaceState to update the URL without reloading
  window.history.pushState({}, "", currentUrl.toString());

  // Restore the scroll position
  window.scrollTo(scrollX, scrollY);
};
