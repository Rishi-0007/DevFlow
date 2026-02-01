import { IconType } from "react-icons";
import {
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiPython,
  DiJava,
  DiPhp,
  DiHtml5,
  DiCss3,
  DiGit,
  DiDocker,
  DiMongodb,
  DiMysql,
  DiPostgresql,
  DiAws,
  DiHeroku,
  DiRedis,
  DiLinux,
  DiJenkins,
  DiNginx,
  DiSwift,
  DiGo,
  DiRust,
  DiDart,
  DiDjango,
  DiBootstrap,
  DiPhotoshop,
  DiIllustrator,
} from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import {
  SiTypescript,
  SiNextdotjs,
  SiBun,
  SiDeno,
  SiCplusplus,
  SiSharp,
  SiTailwindcss,
  SiVuedotjs,
  SiAngular,
  SiJquery,
  SiSass,
  SiLaravel,
  SiRubyonrails,
  SiKubernetes,
  // SiMicrosoftazure was invalid
  SiGooglecloud,
  SiBitbucket,
  SiBlender,
  SiUnity,
  SiUnrealengine,
  SiKotlin,
  SiFlask,
  SiMui,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobexd,
  SiAdobepremierepro,
  SiFigma,
  SiInkscape,
  SiTrello,
  SiJira,
  SiElasticsearch,
  SiRedux,
  SiThreedotjs,
  SiFirebase,
  SiGraphql,
} from "react-icons/si";

export const techMap: { [key: string]: IconType } = {
  // JavaScript
  javascript: DiJavascript1,
  js: DiJavascript1,

  // TypeScript
  typescript: SiTypescript,
  ts: SiTypescript,

  // React
  react: DiReact,
  reactjs: DiReact,

  // Next.js
  nextjs: SiNextdotjs,
  next: SiNextdotjs,

  // Node.js
  nodejs: DiNodejsSmall,
  node: DiNodejsSmall,

  // Bun
  bun: SiBun,
  bunjs: SiBun,

  // Deno
  deno: SiDeno,
  denojs: SiDeno,

  // Python
  python: DiPython,

  // Java
  java: DiJava,

  // C++
  "c++": SiCplusplus,
  cpp: SiCplusplus,

  // C#
  "c#": SiSharp,
  csharp: SiSharp,

  // PHP
  php: DiPhp,

  // HTML
  html: DiHtml5,
  html5: DiHtml5,

  // CSS
  css: DiCss3,
  css3: DiCss3,

  // Git
  git: DiGit,

  // Docker
  docker: DiDocker,

  // MongoDB
  mongodb: DiMongodb,
  mongo: DiMongodb,

  // MySQL
  mysql: DiMysql,

  // PostgreSQL
  postgresql: DiPostgresql,
  postgres: DiPostgresql,

  // AWS
  aws: DiAws,
  "amazon web services": DiAws,

  // Firebase
  firebase: SiFirebase,

  // GraphQL
  graphql: SiGraphql,

  // Vue
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,

  // Tailwind
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,

  // Angular
  angular: SiAngular,

  // jQuery
  jquery: SiJquery,

  // SASS
  sass: SiSass,

  // Laravel
  laravel: SiLaravel,

  // Rails
  rails: SiRubyonrails,
  ruby: SiRubyonrails,

  // Redis
  redis: DiRedis,

  // Linux
  linux: DiLinux,

  // Jenkins
  jenkins: DiJenkins,

  // Kubernetes
  kubernetes: SiKubernetes,

  // Azure
  azure: VscAzure,
  "azure devops": VscAzure,

  // GCP
  gcp: SiGooglecloud,
  "google cloud": SiGooglecloud,

  // Bitbucket
  bitbucket: SiBitbucket,

  // NGINX
  nginx: DiNginx,

  // Blender
  blender: SiBlender,

  // Unity
  unity: SiUnity,

  // Unreal
  unreal: SiUnrealengine,

  // Swift
  swift: DiSwift,

  // Kotlin
  kotlin: SiKotlin,

  // Go
  go: DiGo,

  // Rust
  rust: DiRust,

  // Dart
  dart: DiDart,

  // Flask
  flask: SiFlask,

  // Django
  django: DiDjango,

  // Bootstrap
  bootstrap: DiBootstrap,

  // MUI
  materialui: SiMui,
  "material ui": SiMui,

  // Adobe
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  xd: SiAdobexd,
  premiere: SiAdobepremierepro,

  // Figma
  figma: SiFigma,

  // Inkscape
  inkscape: SiInkscape,

  // Trello
  trello: SiTrello,

  // Jira
  jira: SiJira,

  // Heroku
  heroku: DiHeroku,

  // Elasticsearch
  elasticsearch: SiElasticsearch,

  // Redux
  redux: SiRedux,

  // Three.js
  threejs: SiThreedotjs,
};
