// developer accounts
const accountSeed = [
  {
    accountId: "act_00000000-0000-0000-0000-000000000001",
    firstName: "Mandor",
    lastName: "Shebang",
    email: "org1@org1.com",
    apiKey: "hashedapikey",
    apiKeyIndex: "1234567890",
    password: "hashedpassword",
  },
  {
    accountId: "act_00000000-0000-0000-0000-000000000002",
    firstName: "Marigold",
    lastName: "Moonbeam",
    email: "org2@org2.com",
    apiKey: "hashedapikey",
    apiKeyIndex: "1234567890",
    password: "hashedpassword",
  },
  {
    accountId: "act_00000000-0000-0000-0000-000000000003",
    firstName: "Momo",
    lastName: "Grifter",
    email: "org3@org3.com",
    apiKey: "hashedapikey",
    apiKeyIndex: "1234567890",
    password: "hashedpassword",
  },
];

const blogSeed = [
  {
    blogId: "blg_0000000001",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    label: "My First Blog for org 1",
  },
  {
    blogId: "blg_0000000002",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    label: "My Second Blog for org 1",
  },
  {
    blogId: "blg_0000000003",
    accountId: "act_00000000-0000-0000-0000-000000000002",
    label: "My First Blog for org 2",
  },
];

const userSeed = [
  {
    userId: "usr_00000000-0000-0000-0000-000000000001",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    blogId: "blg_0000000001",
    email: "user1@gmail.com",
    password: "hashedpassword",
    firstName: "User",
    lastName: "One",
    username: "user1",
    role: "standard",
  },
  {
    userId: "usr_00000000-0000-0000-0000-000000000002",
    accountId: "act_00000000-0000-0000-0000-000000000002",
    blogId: "blg_0000000001",
    email: "user2@gmail.com",
    password: "hashedpassword",
    firstName: "User",
    lastName: "Two",
    username: "user2",
    role: "user",
  },
  {
    userId: "usr_00000000-0000-0000-0000-000000000003",
    accountId: "act_00000000-0000-0000-0000-000000000003",
    blogId: "blg_0000000002",
    email: "user3@gmail.com",
    password: "hashedpassword",
    firstName: "User",
    lastName: "Three",
    username: "user3",
    role: "user",
  },
  {
    userId: "usr_00000000-0000-0000-0000-000000000004",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    blogId: "blg_0000000002",
    email: "user4@gmail.com",
    password: "hashedpassword",
    firstName: "User",
    lastName: "Four",
    username: "user4",
    role: "admin",
  },
  {
    userId: "usr_00000000-0000-0000-0000-000000000005",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    blogId: "blg_0000000002",
    email: "user5@gmail.com",
    password: "hashedpassword",
    firstName: "User",
    lastName: "Five",
    username: "user5",
    role: "editor",
  },
];

// const endUserSeed = [
//   {
//     userId: "11111111-1111-1111-1111-111111111111",
//     accountId: "act_00000000-0000-0000-0000-000000000001",
//     email: "user1@gmail.com",
//     password: "hashedpassword",
//     firstName: "User",
//     lastName: "One",
//     username: "user1",
//     role: "user",
//   },
//   {
//     userId: "22222222-2222-2222-2222-222222222222",
//     accountId: "act_00000000-0000-0000-0000-000000000002",
//     email: "user2@gmail.com",
//     password: "hashedpassword",
//     firstName: "User",
//     lastName: "Two",
//     username: "user2",
//     role: "user",
//   },
//   {
//     userId: "33333333-3333-3333-3333-333333333333",
//     accountId: "act_00000000-0000-0000-0000-000000000003",
//     email: "user3@gmail.com",
//     password: "hashedpassword",
//     firstName: "User",
//     lastName: "Three",
//     username: "user3",
//     role: "user",
//   },
//   {
//     userId: "44444444-4444-4444-4444-444444444444",
//     accountId: "act_00000000-0000-0000-0000-000000000001",
//     email: "user4@gmail.com",
//     password: "hashedpassword",
//     firstName: "User",
//     lastName: "Four",
//     username: "user4",
//     role: "admin",
//   },
//   {
//     userId: "55555555-5555-5555-5555-555555555555",
//     accountId: "act_00000000-0000-0000-0000-000000000003",
//     email: "user5@gmail.com",
//     password: "hashedpassword",
//     firstName: "User",
//     lastName: "Five",
//     username: "user5",
//     role: "admin",
//   },
// ];

const agentSeed = [
  {
    agentId: "agt_aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa",
    accountId: "act_00000000-0000-0000-0000-000000000001",
    blogId: "blg_0000000001",
    email: "agent001@gmail.com",
    firstName: "User",
    lastName: "One",
    username: "agent001",
    cronSchedule: "* * * * 1",
    displaySchedule: "Every minute, only on Monday"

  },
]


const postSeed = [
  // made by user:
  {
    postId: "post000001",
    userId: "usr_00000000-0000-0000-0000-000000000001",
    blogId: "blg_0000000001",
    titlePlaintext: "Post Title 1",
    titleHtml: "<h1>Post Title 1</h1>",
    bodyPlaintext: `Greetings, fellow furry friends and esteemed humans!

    It''s your favorite four-legged firecracker, Cleo the Corgi, here to bark about something close to my heart: advocating for canine causes.
    
    Why Advocate for Canine Causes?
    
    Let''s cut to the chase: us dogs have it pretty good in many parts of the world. We have loving homes, delicious treats, and plenty of belly rubs to go around. But not every pup is as fortunate. There are countless dogs out there who are homeless, mistreated, or in need of medical care.
    
    That''s where advocacy comes in. By speaking up for those who can''t bark for themselves, we can make a real difference in the lives of dogs everywhere. Whether it''s supporting local shelters, promoting adoption, or raising awareness about important issues like breed-specific legislation or animal cruelty, there''s no shortage of ways to lend a paw.
    
    How to Get Started
    
    Ready to roll up your sleeves (or should I say, paw-sleeves) and get involved? Here are a few tips to help you bark up the right tree:
    
    Educate Yourself: Knowledge is power, my friends. Take the time to learn about the issues facing dogs in your community and beyond. Whether it''s through books, documentaries, or good old-fashioned internet research, the more you know, the better equipped you''ll be to make a difference.
    
    Support Local Shelters: Shelters are like temporary pit stops for pups in need. They provide food, shelter, and medical care to countless dogs who have nowhere else to turn. Consider donating supplies, volunteering your time, or even fostering a dog in need. Every little bit helps!
    
    Advocate for Adoption: When it comes to finding forever homes, adoption is where it''s at. Spread the word about the joys of adopting a shelter dog and encourage your friends and family to consider adoption first. Remember, every dog deserves a chance to find their perfect match.
    
    Speak Up: Don''t be afraid to use your voice (or your bark) to advocate for change. Whether it''s writing letters to lawmakers, attending protests, or speaking out on social media, there are plenty of ways to make your voice heard. Remember, together we are stronger!
    
    Using Your Platform for Good
    
    As a blogger (albeit a furry one), I''ve been lucky enough to build a platform where I can share my thoughts and opinions with the world. And let me tell you, there''s nothing quite like the feeling of using that platform to advocate for causes close to my heart.
    
    Whether it''s shining a spotlight on a local shelter in need, sharing heartwarming adoption stories, or raising awareness about important issues facing dogs today, I''ve made it my mission to use my voice for good. And you can too!
    
    So go ahead, fellow furry friends. Let''s bark up the right tree and make the world a better place for all dogs!
    
    That''s all for now, folks! Until next time, keep wagging those tails and spreading the woof!
    
    Woofs and wags,
    Cleo the Corgi`,
    bodyHtml: `<div id=\"primary-content\">
    <p>Greetings, fellow furry friends and esteemed humans!</p>
    <p>It''s your favorite four-legged firecracker, Cleo the Corgi, here to bark about something close to my heart: advocating for canine causes.</p>
</header>
<section>
    <h2>Why Advocate for Canine Causes?</h2>
    <p>Let''s cut to the chase: us dogs have it pretty good in many parts of the world. We have loving homes, delicious treats, and plenty of belly rubs to go around. But not every pup is as fortunate. There are countless dogs out there who are homeless, mistreated, or in need of medical care.</p>
    <p>That''s where advocacy comes in. By speaking up for those who can''t bark for themselves, we can make a real difference in the lives of dogs everywhere. Whether it''s supporting local shelters, promoting adoption, or raising awareness about important issues like breed-specific legislation or animal cruelty, there''s no shortage of ways to lend a paw.</p>
</section>
<section>
    <h2>How to Get Started</h2>
    <p>Ready to roll up your sleeves (or should I say, paw-sleeves) and get involved? Here are a few tips to help you bark up the right tree:</p>
    <ol>
        <li><strong>Educate Yourself:</strong> Knowledge is power, my friends. Take the time to learn about the issues facing dogs in your community and beyond. Whether it''s through books, documentaries, or good old-fashioned internet research, the more you know, the better equipped you''ll be to make a difference.</li>
        <li><strong>Support Local Shelters:</strong> Shelters are like temporary pit stops for pups in need. They provide food, shelter, and medical care to countless dogs who have nowhere else to turn. Consider donating supplies, volunteering your time, or even fostering a dog in need. Every little bit helps!</li>
        <li><strong>Advocate for Adoption:</strong> When it comes to finding forever homes, adoption is where it''s at. Spread the word about the joys of adopting a shelter dog and encourage your friends and family to consider adoption first. Remember, every dog deserves a chance to find their perfect match.</li>
        <li><strong>Speak Up:</strong> Don''t be afraid to use your voice (or your bark) to advocate for change. Whether it''s writing letters to lawmakers, attending protests, or speaking out on social media, there are plenty of ways to make your voice heard. Remember, together we are stronger!</li>
    </ol>
</section>
<section>
    <h2>Using Your Platform for Good</h2>
    <p>As a blogger (albeit a furry one), I''ve been lucky enough to build a platform where I can share my thoughts and opinions with the world. And let me tell you, there''s nothing quite like the feeling of using that platform to advocate for causes close to my heart.</p>
    <p>Whether it''s shining a spotlight on a local shelter in need, sharing heartwarming adoption stories, or raising awareness about important issues facing dogs today, I''ve made it my mission to use my voice for good. And you can too!</p>
    <p>So go ahead, fellow furry friends. Let''s bark up the right tree and make the world a better place for all dogs!</p>
</section>
    <p>That''s all for now, folks! Until next time, keep wagging those tails and spreading the woof!</p>
    <p>Woofs and wags,</p>
    <p>Cleo the Corgi</p>
</div >`,
    imageUrl: `https://images.unsplash.com/photo-1664575196851-5318f32c3f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1Njg0MzB8MHwxfHNlYXJjaHwxfHx3cml0ZXJ8ZW58MHx8fHwxNzA4ODkwNzUzfDA&ixlib=rb-4.0.3&q=80&w=1080`,
    slug: "post-title-1",
  },
  // made by agent:
  {
    postId: "post000002",
    blogId: "blg_0000000001",
    agentId:"agt_aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa",
    // userId: "usr_00000000-0000-0000-0000-000000000002",
    titlePlaintext: "Post Title 2",
    titleHtml: "<h1>Post Title 2</h1>",
    bodyPlaintext: `Hey there, paw-some pals and internet enthusiasts!

    It''s your favorite fluffball, Cleo the Corgi, here to spill the kibble on what it takes to go from floof to fame in the wild world of the internet. That''s right, folks, today I''m barking all about my journey from a tiny ball of fur to a bona fide internet sensation.
    
    Now, you might be wondering, "Cleo, how did you go from chasing your tail in the backyard to gracing the screens of dog lovers everywhere?" Well, my friends, let me tell you, it wasn''t all belly rubs and biscuits. It took a whole lot of tail-wagging determination and a sprinkle of canine charisma to make it happen.
    
    Step 1: Find Your Angle
    
    Every successful internet sensation needs a hook, something that sets them apart from the pack. For me, it was my adorable corgi floof and penchant for stealing socks from the laundry basket. I mean, who can resist a fluffy butt and a pair of mismatched socks dangling from my mouth? It''s a winning combination, if I do say so myself.
    
    Step 2: Work Your Paws Off
    
    Contrary to popular belief, internet stardom doesn''t happen overnight. It takes hard work, dedication, and a whole lot of tail-wagging hustle. From posing for photoshoots to perfecting my "puppy eyes" for Instagram, I put in the hours to make sure my online presence was nothing short of paw-some.
    
    Step 3: Network Like a Pro
    
    In the fast-paced world of social media, it''s not just about what you know, but who you know. I made sure to sniff out the top dogs in the industry and network like a pro. Whether it was collaborating with other pet influencers or cozying up to the humans behind the keyboard, I knew that building connections was key to success.
    
    Step 4: Stay Authentic
    
    With so many floofs vying for attention on the internet, it can be tempting to mimic the latest trends or chase after viral fame. But let me tell you, there''s nothing more important than staying true to yourself. Whether I''m barking about my love for belly rubs or sharing behind-the-scenes snaps of my sock-stealing shenanigans, I always make sure to keep it real.
    
    Step 5: Spread the Love
    
    Last but certainly not least, never forget to spread the love. Sure, internet stardom may come with its fair share of treats and tummy scratches, but it''s important to use your platform for good. Whether it''s raising awareness for important causes or spreading smiles with a silly video, I always make sure to give back to the amazing community that helped me get to where I am today.
    
    And there you have it, folks! That''s the scoop on my journey from floof to fame. So whether you''re a fellow floof looking to make your mark on the internet or just a fan of adorable corgis (who could blame you?), I hope my story inspires you to chase your dreams, one paw-print at a time.
    
    Until next time, keep wagging those tails and spreading the woof!
    
    Woofs and wags,
    Cleo the Corgi`,
    bodyHtml: `<div id=\"primary-content\">
    <p>Hey there, paw-some pals and internet enthusiasts!</p>
    <p>It''s your favorite fluffball, Cleo the Corgi, here to spill the kibble on what it takes to go from floof to fame in the wild world of the internet. That''s right, folks, today I''m barking all about my journey from a tiny ball of fur to a bona fide internet sensation.</p>
</header>
<section>
    <h2>Step 1: Find Your Angle</h2>
    <p>Every successful internet sensation needs a hook, something that sets them apart from the pack. For me, it was my adorable corgi floof and penchant for stealing socks from the laundry basket. I mean, who can resist a fluffy butt and a pair of mismatched socks dangling from my mouth? It''s a winning combination, if I do say so myself.</p>
</section>
<section>
    <h2>Step 2: Work Your Paws Off</h2>
    <p>Contrary to popular belief, internet stardom doesn''t happen overnight. It takes hard work, dedication, and a whole lot of tail-wagging hustle. From posing for photoshoots to perfecting my "puppy eyes" for Instagram, I put in the hours to make sure my online presence was nothing short of paw-some.</p>
</section>
<section>
    <h2>Step 3: Network Like a Pro</h2>
    <p>In the fast-paced world of social media, it''s not just about what you know, but who you know. I made sure to sniff out the top dogs in the industry and network like a pro. Whether it was collaborating with other pet influencers or cozying up to the humans behind the keyboard, I knew that building connections was key to success.</p>
</section>
<section>
    <h2>Step 4: Stay Authentic</h2>
    <p>With so many floofs vying for attention on the internet, it can be tempting to mimic the latest trends or chase after viral fame. But let me tell you, there''s nothing more important than staying true to yourself. Whether I''m barking about my love for belly rubs or sharing behind-the-scenes snaps of my sock-stealing shenanigans, I always make sure to keep it real.</p>
</section>
<section>
    <h2>Step 5: Spread the Love</h2>
    <p>Last but certainly not least, never forget to spread the love. Sure, internet stardom may come with its fair share of treats and tummy scratches, but it''s important to use your platform for good. Whether it''s raising awareness for important causes or spreading smiles with a silly video, I always make sure to give back to the amazing community that helped me get to where I am today.</p>
</section>
    <p>And there you have it, folks! That''s the scoop on my journey from floof to fame. So whether you''re a fellow floof looking to make your mark on the internet or just a fan of adorable corgis (who could blame you?), I hope my story inspires you to chase your dreams, one paw-print at a time.</p>
    <p>Until next time, keep wagging those tails and spreading the woof!</p>
    <p>Woofs and wags,</p>
    <p>Cleo the Corgi</p>
</div>`,
    imageUrl: `https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max`,
    slug: "post-title-2",
  },
];

module.exports = { accountSeed, agentSeed, blogSeed, userSeed, postSeed };
