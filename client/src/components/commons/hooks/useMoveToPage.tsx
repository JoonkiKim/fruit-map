import { useRouter } from "next/router";

/**
 * Custom hook to navigate between pages using Next.js router.
 * @returns {Function} - A function that navigates to the given page.
 */
export default function useMoveToPage(): (path: string) => void {
  const router = useRouter();

  /**
   * Navigates to the specified page.
   */
  const moveToPage = (path: string) => {
    router.push({ pathname: path });
  };

  return moveToPage;
}
