import { useState, useEffect } from 'react';

export const useRecentlyViewed = () => {
  const [recentLinks, setRecentLinks] = useState([]);

  useEffect(() => {
    const toSaveLinks = document.querySelectorAll('a.documentLink');

    toSaveLinks.forEach((link) => {
      link.addEventListener('click', handleLinkClick);
    });

    // recently-viewed array from local storage, and remove any link objects that are more than 30 days (10 minutes for now) old
    const recentlyViewedStr = localStorage.getItem('recentlyViewed');
    let recentlyViewed = [];
    if (recentlyViewedStr) {
      try {
        recentlyViewed = JSON.parse(recentlyViewedStr).filter((link: any) => {
          //const cutoffTimestamp = Date.now() - 30 * 24 * 60 * 60 * 1000;
          const cutoffTimestamp = new Date().getTime() - 600000;
          return new Date(link.expiry).getTime() > cutoffTimestamp;
        });
      } catch (error) {
        console.error('Error parsing recentlyViewed from localStorage', error);
      }
    }

    // if the recently-viewed array is empty, and remove the key from local storage
    if (recentlyViewed.length === 0) {
      localStorage.removeItem('recentlyViewed');
    } else {
      // A max of 50 (10 for now) documents can be added, once that is reached, older documents are removed
      if (recentlyViewed.length > 10) {
        recentlyViewed.pop();
      }
      // Save the updated recently-viewed array back to local storage
      localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      const recentlyViewedSaved = JSON.parse(localStorage.getItem('recentlyViewed') || '') || [];
      setRecentLinks(recentlyViewedSaved);
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      toSaveLinks.forEach((link) => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  const handleLinkClick = (event: any) => {
    const link = event.currentTarget;
    // recently-viewed array from local storage, or create a new one
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // check if the link's href already exists in the recently-viewed array
    const existingLinkIndex = recentlyViewed.findIndex((obj: any) => obj.href === link.href);

    if (existingLinkIndex !== -1) {
      // If the href already exists, update the expiry and move the object to the beginning of the array
      recentlyViewed[existingLinkIndex].expiry = new Date().toISOString();
      const existingLinkObj = recentlyViewed.splice(existingLinkIndex, 1)[0];
      existingLinkObj.expiry = new Date().toISOString();
      recentlyViewed.unshift(existingLinkObj);
    } else {
      // If the href is new, create a new object with the href value and current expiry, and add it to the beginning of the array
      const linkObj = {
        href: link.href,
        text: link.title,
        expiry: new Date().toISOString(),
      };

      // A max of 50 (10 for now) documents can be added, once that is reached, older documents are removed from the list
      if (recentlyViewed.length >= 10) {
        recentlyViewed.pop();
      }
      recentlyViewed.unshift(linkObj);
    }

    // Items added to the list are removed after 30 days (10 minutes for now)
    //const cutoffTimestamp = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const cutoffTimestamp = new Date().getTime() - 600000;
    const recentLinks = recentlyViewed.filter(
      (link: any) => new Date(link.expiry).getTime() > cutoffTimestamp
    );

    // if the recently-viewed array is empty, and remove the key from local storage
    if (recentLinks.length === 0) {
      localStorage.removeItem('recentlyViewed');
    } else {
      // Save the updated recently-viewed array back to local storage
      localStorage.setItem('recentlyViewed', JSON.stringify(recentLinks));
      const recentlyViewedSaved = JSON.parse(localStorage.getItem('recentlyViewed') || '') || [];
      setRecentLinks(recentlyViewedSaved);
    }
  };

  return { recentLinks };
};
