#!/usr/bin/env node

/**
 * Version Bump Script for AIgent Orange
 * 
 * This script handles semantic versioning for the AIgent Orange project.
 * It updates version numbers in all relevant files and maintains consistency
 * across the project documentation and configuration files.
 * 
 * Usage: node scripts/bump_version.js [patch|minor|major]
 * 
 * Examples:
 *   node scripts/bump_version.js patch    # 1.0.0 -> 1.0.1
 *   node scripts/bump_version.js minor    # 1.0.0 -> 1.1.0
 *   node scripts/bump_version.js major    # 1.0.0 -> 2.0.0
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  files: [
    'package.json',
    'README.md',
    'CHANGELOG.md',
    '.llm/MEMORY.md',
    '.llm/TODO.md'
  ],
  versionRegex: /(\d+\.\d+\.\d+)/g,
  currentDate: new Date().toISOString().split('T')[0]
};

/**
 * Parse current version from package.json
 */
function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Bump version based on semantic versioning rules
 */
function bumpVersion(currentVersion, bumpType) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (bumpType) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      console.error('Invalid bump type. Use: patch, minor, or major');
      process.exit(1);
  }
}

/**
 * Update version in package.json
 */
function updatePackageJson(newVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log(`✓ Updated package.json to version ${newVersion}`);
  } catch (error) {
    console.error('Error updating package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Update version references in README.md
 */
function updateReadme(newVersion) {
  try {
    let content = fs.readFileSync('README.md', 'utf8');
    
    // Update version in badges, installation instructions, etc.
    content = content.replace(CONFIG.versionRegex, newVersion);
    
    fs.writeFileSync('README.md', content);
    console.log(`✓ Updated README.md to version ${newVersion}`);
  } catch (error) {
    console.error('Error updating README.md:', error.message);
    process.exit(1);
  }
}

/**
 * Update CHANGELOG.md with new version
 */
function updateChangelog(newVersion, bumpType) {
  try {
    let content = fs.readFileSync('CHANGELOG.md', 'utf8');
    
    // Remove unreleased section if it exists
    content = content.replace(
      /\n## \[Unreleased\][\s\S]*?\n## \[/,
      '\n## ['
    );
    
    // Add new version section
    const versionSection = `## [${newVersion}] - ${CONFIG.currentDate}

### Added
- Version bump to ${newVersion} (${bumpType} release)

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

`;
    
    content = content.replace('## [', versionSection + '## [');
    
    fs.writeFileSync('CHANGELOG.md', content);
    console.log(`✓ Updated CHANGELOG.md with version ${newVersion}`);
  } catch (error) {
    console.error('Error updating CHANGELOG.md:', error.message);
    process.exit(1);
  }
}

/**
 * Update version in MEMORY.md
 */
function updateMemory(newVersion) {
  try {
    let content = fs.readFileSync('.llm/MEMORY.md', 'utf8');
    
    // Update version in memory file
    content = content.replace(CONFIG.versionRegex, newVersion);
    
    // Update last updated date
    content = content.replace(
      /\*\*Memory Last Updated\*\*: \d{4}-\d{2}-\d{2}/,
      `**Memory Last Updated**: ${CONFIG.currentDate}`
    );
    
    fs.writeFileSync('.llm/MEMORY.md', content);
    console.log(`✓ Updated .llm/MEMORY.md to version ${newVersion}`);
  } catch (error) {
    console.error('Error updating MEMORY.md:', error.message);
    process.exit(1);
  }
}

/**
 * Update version in TODO.md
 */
function updateTodo(newVersion) {
  try {
    let content = fs.readFileSync('.llm/TODO.md', 'utf8');
    
    // Update version in todo file
    content = content.replace(CONFIG.versionRegex, newVersion);
    
    // Update last updated date
    content = content.replace(
      /\*Last Updated: \d{4}-\d{2}-\d{2}/,
      `*Last Updated: ${CONFIG.currentDate}`
    );
    
    fs.writeFileSync('.llm/TODO.md', content);
    console.log(`✓ Updated .llm/TODO.md to version ${newVersion}`);
  } catch (error) {
    console.error('Error updating TODO.md:', error.message);
    process.exit(1);
  }
}

/**
 * Validate that all files were updated correctly
 */
function validateUpdates(newVersion) {
  console.log('\n🔍 Validating version updates...');
  
  let allValid = true;
  
  CONFIG.files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hasNewVersion = content.includes(newVersion);
      
      if (hasNewVersion) {
        console.log(`✓ ${file} contains version ${newVersion}`);
      } else {
        console.log(`✗ ${file} does not contain version ${newVersion}`);
        allValid = false;
      }
    } catch (error) {
      console.log(`✗ Could not validate ${file}: ${error.message}`);
      allValid = false;
    }
  });
  
  return allValid;
}

/**
 * Generate git commands for the version bump
 */
function generateGitCommands(newVersion) {
  console.log('\n📋 Git commands for this release:');
  console.log(`git add -A`);
  console.log(`git commit -m "chore: bump version to ${newVersion}"`);
  console.log(`git tag v${newVersion}`);
  console.log(`git push origin main`);
  console.log(`git push origin v${newVersion}`);
}

/**
 * Main execution function
 */
function main() {
  const bumpType = process.argv[2];
  
  if (!bumpType) {
    console.log('Usage: node scripts/bump_version.js [patch|minor|major]');
    console.log('');
    console.log('Bump types:');
    console.log('  patch - Bug fixes, documentation updates, minor improvements');
    console.log('  minor - New features, framework additions, workflow improvements');
    console.log('  major - Breaking changes, major architectural changes');
    process.exit(1);
  }
  
  if (!['patch', 'minor', 'major'].includes(bumpType)) {
    console.error('Invalid bump type. Use: patch, minor, or major');
    process.exit(1);
  }
  
  console.log(`🚀 Bumping version (${bumpType})...`);
  
  // Get current version
  const currentVersion = getCurrentVersion();
  console.log(`Current version: ${currentVersion}`);
  
  // Calculate new version
  const newVersion = bumpVersion(currentVersion, bumpType);
  console.log(`New version: ${newVersion}`);
  
  // Update all files
  console.log('\n📝 Updating files...');
  updatePackageJson(newVersion);
  updateReadme(newVersion);
  updateChangelog(newVersion, bumpType);
  updateMemory(newVersion);
  updateTodo(newVersion);
  
  // Validate updates
  const isValid = validateUpdates(newVersion);
  
  if (isValid) {
    console.log('\n✅ Version bump completed successfully!');
    generateGitCommands(newVersion);
  } else {
    console.log('\n❌ Version bump validation failed!');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  bumpVersion,
  getCurrentVersion,
  updatePackageJson,
  updateReadme,
  updateChangelog,
  updateMemory,
  updateTodo,
  validateUpdates
};
