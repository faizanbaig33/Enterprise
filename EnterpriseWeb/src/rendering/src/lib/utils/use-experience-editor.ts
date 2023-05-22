import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const useExperienceEditor = (): boolean => {
  const context = useSitecoreContext();
  if (!context?.sitecoreContext) {
    return false;
  }
  return context?.sitecoreContext.pageEditing ? context.sitecoreContext.pageEditing : false;
};

export default useExperienceEditor;
