[x]research how to handle authentication with clerk
[x]authenticate all endpoints
[]add timeframe button to change data from monthly,yearly,quarterly
[x]implement tanstack query for caching
[x]add function to modify api response to format for rechart
[]create error page to match app theme
[x]take transactions and make function to convert to properly display in pie chart
[x]fix converToChart function to gruop transactions by transaction type so the chart does not keep adding per transaction
[x]update table to add transaction type
[x]update add transaction form to add transaction type
[]make tests using jest
[]look at convex queries to see where to optimize
[x]look into server components
[]improve error UI
[x]add icons to recent transaction
[x]update chart colors to have defaults for each catregory
[x]add zod validation to post transaction endpoint
[x]change font of date in recent transactions
[x]work on planning budget progess functionality
[x]possibliy add extra table for budget goals and budgets for each category
[x]add view all transaction button in recent transaction card
[x]create page to view all transaction of given time frame
[x]add ability to remove transactions
[]add ability to edit transactions
[x]add dark mode button
[x]add functionality to export to csv
[]add a demo login user
[]add a demo button so users can just click and view how app works
[x]add rate limits
[x]host on vercel
[x]modify recent transactions for better responsive design
[x]fix header in layout to add hamburger menu to free space on header
[x]add better error handling to exportData function in transactions page
[x]better filtering and order of data in exported csv file
[x]need to fix export function(if console log is not printed it wont export)
[x]add confirmation when deleting transactions
[x]add toast or alert when successfully deleting transaction or adding transaction
[x]fix transaction type as savings adding to the balance instead of removing from balance
[]improve skeleton ui to match based off screen size
[x]add confirmation when deleting a transaction
[x]add UI to let users know that there is no data for given timeframe instead of jsut being empty
[x]if user selects month in dashboard and clicks on view all transactions it should show transactions from selected month
[]add search and filter component to transactions page
[]add ability to duplicate an entry
[]rollover unused budget to next month
[]average spending per category
[]learn to use docker to deploy myself
[x]make each component more responsive
[]add ability to add receipts
[x] review what the suspense wrapper is and what it is used for
[x]remove all console.logs in main branch
[]check clerk cookie error
[x]deploy on vercel
[]remove nextjs api routes to external api
[x]remove export button when there are no transactions in month
[]add theme selection based off OS selection
[x]check to see if clerk signIn/signUp components allow for dark mode
[x]fix layout of timeframe and export button when in mobile screen
[x]change transaction icon colors in dark mode
[x]fix issue where i can access routes that should be protected
[x]change amount input so i can erase the 0. Currently you cant remove it and reduces UX
[x]check if shadcn calendar can show future dates and select them
[x]create button to navigate to budget endpoint
[x]create budget endpoint
[x]add progress bar in budget page
[x]make progress bar dynamic with user input
[]create proper loading screen for budgets page
[]budgets can be viewed from other months
[x]change progress bar color
[x] change percentage amount color based on being within budget or not
[x]add confirmation when deleting budget
[]view description of description if provided
[x]add infinite scroll
[x]find better desing for budgetcard
[]add icon for each budget category
[] add a last updated to budget card
[]fix issue of having multiple budgets of same category
[x]fix issue with being sent to landing page everytime user clicks on home
[x]create component to upload images
[]create aws lambda function to uplaod images to S3
[x]create S3 bucket for receipts
[x]create endpoint to insert metadata of receipts
[x]create endpoint to get metadata of receipts
[]add ability to download receipt
[x]fixed mobile layout for all transactions component
[x]added modal to view images from s3
[x]removed testing userId from function to submit to s3
[]need to add view receipt button to recent transactions component
[]change white color for budget chart since it is to off putting
[]make better ui for transactions with very larger numbers
[x]add comma to transaction amounts if over 999.99
[x]add download functionality
[x]fix image modal to fit properly on mobile
[x]check issue with some image not loading when clicking on view receipt(possible size,format,or fetch issue)
[]add zod schema and safe parse for chart color validation instead of assertion
[]add more details to view receipt modal like what transaction is being viewed
[]find a way to add the description of a transaction in UI
[]let users click on a specific transaction to get all details and images in one go
[x]add endpoint to delete image from s3 when deleteing a transaction that has a receipt
