const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const dir = path.join(__dirname, 'frontend', 'src', 'app');
const allFiles = walk(dir);
const replacements = [];

for (const file of allFiles) {
  const match = file.match(/\.(spec\.ts|ts|html|scss)$/);
  if (!match) continue;
  
  const ext = match[0];
  const dirname = path.dirname(file);
  const parentFolder = path.basename(dirname);
  const basename = path.basename(file, ext);
  
  if (basename === parentFolder && !basename.includes('.component') && !basename.includes('.module')) {
    const newName = `${basename}.component${ext}`;
    const newPath = path.join(dirname, newName);
    fs.renameSync(file, newPath);
    console.log(`Renamed ${file} -> ${newPath}`);
    
    // E.g. "./hero" -> "./hero.component" inside parent importing it, or "../../components/hero/hero" -> "../../components/hero/hero.component"
    replacements.push({
      oldName: basename,
      newName: `${basename}.component`
    });
  }
}

// Now update the contents of all TS files
const updatedFiles = walk(dir);
for (const file of updatedFiles) {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    for (const rep of replacements) {
      // replace imports endings e.g. /hero' or /hero"
      const regex = new RegExp(`/${rep.oldName}(['"])`, 'g');
      content = content.replace(regex, `/${rep.newName}$1`);
      
      // replace local imports e.g. './navbar'
      const regexLocal = new RegExp(`\\.\\/${rep.oldName}(['"])`, 'g');
      content = content.replace(regexLocal, `./${rep.newName}$1`);
    }
    
    // Fix templateUrl and styleUrl
    const templateRegex = /templateUrl:\s*['"]\.\/([^'"]+)\.html['"]/g;
    content = content.replace(templateRegex, (match, base) => {
      if (!base.endsWith('.component')) return `templateUrl: './${base}.component.html'`;
      return match;
    });
    
    const styleRegex = /styleUrls?:\s*\[?['"]\.\/([^'"]+)\.scss['"]\]?/g;
    content = content.replace(styleRegex, (match, base) => {
      if (!base.endsWith('.component')) return `styleUrls: ['./${base}.component.scss']`;
      return match;
    });

    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log(`Updated imports in ${file}`);
    }
  }
}
