const covers = [
  '0_f-xBze63JAovDzlv.jpg',
  '1_dLCYJc-7KCnY0lCyPT4rVQ.jpg',
  '1_iYdLP_TVCrJVFTFrGELkRw.png',
  'billing-1024x273.jpg',
  'blog-img-5.jpg',
  'blogs-9-pasos-faciles.png',
  'branding-and-marketing-for-product-of-startup-business-1580176-0.svg',
  'business-employees-team-working.svg',
  'business-lady-do-multi-tasking-1580194-0.svg',
  'concept-of-business-woman-finding-employees-for-business-1580178-0.svg',
  'multi-tasking-ceo-handling-multiple-departments-with-ease-1580192-0.svg',
  'product-release-and-launch.svg',
  'startup-of-online-shopping-business-with-customer-support-1580186-0.svg',
  'the-small-joys-of-april-2021-wallpapers-edition-2.png',
  'user-flow.jpg',
  'Web-Accessibility.jpg'
];

function randomCover() {
  const index = Math.floor(Math.random() * covers.length);
  return covers[index];
}

module.exports = randomCover;