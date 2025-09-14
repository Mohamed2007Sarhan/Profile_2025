const fs = require('fs');
const path = require('path');

// Create placeholder images for projects
const projects = [
  'ai-maker',
  'dental-ai',
  'cyber-shield',
  'cyber-recon', 
  'stream-rtc',
  'android-task-manager',
  'desktop-crypto-tracker',
  'ibrand-frontend',
  'courses-web',
  'security-dashboard',
  'medtech-suite',
  'quantum-crypto',
  'neural-art'
];

// Create placeholder images for testimonials
const testimonials = [
  'ahmed-hassan',
  'fatima-ali',
  'omar-mahmoud', 
  'nour-ibrahim',
  'youssef-ahmed'
];

// Create a simple SVG placeholder
function createPlaceholderSVG(width, height, text, bgColor = '#1e293b', textColor = '#64748b') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Generate project placeholders
projects.forEach(project => {
  const svg = createPlaceholderSVG(800, 600, project.replace('-', ' ').toUpperCase(), '#0f172a', '#94a3b8');
  fs.writeFileSync(`public/images/projects/${project}.svg`, svg);
  console.log(`Created placeholder for ${project}`);
});

// Generate testimonial placeholders
testimonials.forEach(testimonial => {
  const svg = createPlaceholderSVG(200, 200, testimonial.split('-').map(name => name.charAt(0).toUpperCase()).join(''), '#1e293b', '#94a3b8');
  fs.writeFileSync(`public/images/testimonials/${testimonial}.svg`, svg);
  console.log(`Created placeholder for ${testimonial}`);
});

// Create profile placeholder
const profileSVG = createPlaceholderSVG(400, 400, 'MS', '#0f172a', '#94a3b8');
fs.writeFileSync('public/images/profile-mohamed.svg', profileSVG);
console.log('Created profile placeholder');

console.log('All placeholder images generated successfully!');
