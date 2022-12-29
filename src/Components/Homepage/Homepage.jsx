import { Link } from "@tanstack/react-location";
import homeimage from "../../Resources/Images/woman.png";
import homeimage2 from "../../Resources/Images/twoppl.png";
import { useQuery } from "@tanstack/react-query";

const getPaths = () => fetch(`http://oki.com:8000/api/path`).then(response => response.json());

    
function Homepage() {

    const { data, error, isLoading } = useQuery(["paths"], getPaths);

    return (
    <div>
        <div className='bg-colore w-full h-96  text-white'>
            <div className="mx-auto flex h-full w-3/5 items-center justify-center">
                <div className="w-full space-y-8 px-4 xl:w-1/2">
                    <h1 className="text-5xl text-left">SKNI Learning: Learn, experience, Grow</h1>
                    <p className="max-w-[60ch] text-2xl text-colorf text-left">Take part in learning paths, discover new opportunities, and take advantage of personalized courses just for YOU!</p>
                </div>
                <div className="relative hidden h-full w-1/2 px-4 xl:block">
                    <img className="absolute bottom-0 right-0 h-full object-contain object-bottom" src={homeimage} />
                </div>
            </div>
        </div>

        <div className='bg-colorg w-full py-10 h-full text-colorb'>
            <div className="m-auto flex h-full w-5/6 items-center">
                <div className="w-1/2 h-full">
                    <div className="relative h-40 w-4/5 m-4 p-8 xl:block bg-white shadow-pathcard">
                        <div className="">
                            <span className="text-4xl border-b-2 border-colora"> Backend developer </span>
                        </div>
                        <Link to="/paths">
                        <div className="absolute bottom-0 right-5 ml-auto xl:mt-10 text-3xl text-right w-14 h-14">
                            <svg className="fill-colora hover:fill-colore" width="54px" height="54px" viewBox="0 -75.6 193 193" xmlns="http://www.w3.org/2000/svg">
                                <path d="M173.928 21.1292C115.811 44.9386 58.751 45.774 0 26.1417C4.22669 21.7558 7.81938 23.4266 10.5667 24.262C31.7002 29.9011 53.4676 30.5277 75.0238 31.3631C106.09 32.6162 135.465 25.5151 164.207 14.0282C165.475 13.6104 166.532 12.775 169.068 11.1042C154.486 8.18025 139.903 13.1928 127.223 7.34485C127.435 6.50944 127.435 5.46513 127.646 4.62971C137.156 4.00315 146.877 3.37658 156.388 2.54117C165.898 1.70575 175.196 0.661517 184.706 0.0349538C191.68 -0.382755 194.639 2.9589 192.103 9.22453C188.933 17.3698 184.495 24.8886 180.48 32.6162C180.057 33.4516 179.423 34.4959 178.578 34.9136C176.253 35.749 173.928 35.9579 171.392 36.5845C170.97 34.4959 169.913 32.1985 170.124 30.3188C170.547 27.8126 172.026 25.724 173.928 21.1292Z"/>
                            </svg>
                        </div>
                        </Link>
                    </div>
                    <div className="relative h-40 w-4/5 m-4 p-8 xl:block bg-white shadow-pathcard">
                        <div className="">
                            <span className="text-4xl border-b-2 border-colora"> Frontend developer</span>
                        </div>
                        <Link to="/paths">
                        <div className="absolute bottom-0 right-5 ml-auto xl:mt-10 text-3xl text-right w-14 h-14">
                            <svg className="fill-colora hover:fill-colore" width="54px" height="54px" viewBox="0 -75.6 193 193" xmlns="http://www.w3.org/2000/svg">
                                <path d="M173.928 21.1292C115.811 44.9386 58.751 45.774 0 26.1417C4.22669 21.7558 7.81938 23.4266 10.5667 24.262C31.7002 29.9011 53.4676 30.5277 75.0238 31.3631C106.09 32.6162 135.465 25.5151 164.207 14.0282C165.475 13.6104 166.532 12.775 169.068 11.1042C154.486 8.18025 139.903 13.1928 127.223 7.34485C127.435 6.50944 127.435 5.46513 127.646 4.62971C137.156 4.00315 146.877 3.37658 156.388 2.54117C165.898 1.70575 175.196 0.661517 184.706 0.0349538C191.68 -0.382755 194.639 2.9589 192.103 9.22453C188.933 17.3698 184.495 24.8886 180.48 32.6162C180.057 33.4516 179.423 34.4959 178.578 34.9136C176.253 35.749 173.928 35.9579 171.392 36.5845C170.97 34.4959 169.913 32.1985 170.124 30.3188C170.547 27.8126 172.026 25.724 173.928 21.1292Z"/>
                            </svg>
                        </div>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 h-full">
                    <div className="relative h-40 w-4/5 m-4 p-8 xl:block bg-white shadow-pathcard">
                        <div className="">
                            <span className="text-4xl border-b-2 border-colora"> DevOps Engeneer</span>
                        </div>
                        <Link to="/paths">
                        <div className="absolute bottom-0 right-5 ml-auto xl:mt-10 text-3xl text-right w-14 h-14">
                            <svg className="fill-colora hover:fill-colore" width="54px" height="54px" viewBox="0 -75.6 193 193" xmlns="http://www.w3.org/2000/svg">
                                <path d="M173.928 21.1292C115.811 44.9386 58.751 45.774 0 26.1417C4.22669 21.7558 7.81938 23.4266 10.5667 24.262C31.7002 29.9011 53.4676 30.5277 75.0238 31.3631C106.09 32.6162 135.465 25.5151 164.207 14.0282C165.475 13.6104 166.532 12.775 169.068 11.1042C154.486 8.18025 139.903 13.1928 127.223 7.34485C127.435 6.50944 127.435 5.46513 127.646 4.62971C137.156 4.00315 146.877 3.37658 156.388 2.54117C165.898 1.70575 175.196 0.661517 184.706 0.0349538C191.68 -0.382755 194.639 2.9589 192.103 9.22453C188.933 17.3698 184.495 24.8886 180.48 32.6162C180.057 33.4516 179.423 34.4959 178.578 34.9136C176.253 35.749 173.928 35.9579 171.392 36.5845C170.97 34.4959 169.913 32.1985 170.124 30.3188C170.547 27.8126 172.026 25.724 173.928 21.1292Z"/>
                            </svg>
                        </div>
                        </Link>
                    </div>
                    <div className="relative h-40 w-4/5 m-4 p-8 xl:block bg-white shadow-pathcard">
                    <div className="">
                            <span className="text-4xl border-b-2 border-colora"> UI/UX Designer </span>
                        </div>
                        <Link to="/paths">
                        <div className="absolute bottom-0 right-5  ml-auto xl:mt-10 text-3xl text-right w-14 h-14">
                            <svg className="fill-colora hover:fill-colore" width="54px" height="54px" viewBox="0 -75.6 193 193" xmlns="http://www.w3.org/2000/svg">
                                <path d="M173.928 21.1292C115.811 44.9386 58.751 45.774 0 26.1417C4.22669 21.7558 7.81938 23.4266 10.5667 24.262C31.7002 29.9011 53.4676 30.5277 75.0238 31.3631C106.09 32.6162 135.465 25.5151 164.207 14.0282C165.475 13.6104 166.532 12.775 169.068 11.1042C154.486 8.18025 139.903 13.1928 127.223 7.34485C127.435 6.50944 127.435 5.46513 127.646 4.62971C137.156 4.00315 146.877 3.37658 156.388 2.54117C165.898 1.70575 175.196 0.661517 184.706 0.0349538C191.68 -0.382755 194.639 2.9589 192.103 9.22453C188.933 17.3698 184.495 24.8886 180.48 32.6162C180.057 33.4516 179.423 34.4959 178.578 34.9136C176.253 35.749 173.928 35.9579 171.392 36.5845C170.97 34.4959 169.913 32.1985 170.124 30.3188C170.547 27.8126 172.026 25.724 173.928 21.1292Z"/>
                            </svg>
                        </div>
                        </Link>
                    </div>
                </div>

                <div className="w-full space-y-8 px-4 xl:w-1/2">
                    <h1 className="text-5xl text-left">What path do you choose for your future?</h1>
                    <p className="max-w-[60ch] text-2xl text-colord text-left">Choose from <span className="font-bold"> {isLoading && <span className="bg-colore rounded-md w-4 h-4"></span>}{data && data.length} </span> learning paths.</p>
                </div>
            </div>
        </div>

        <div className='bg-white w-full h-96 pt-10  text-colora'>
            <div className="mx-auto flex h-full w-3/5 items-center justify-center">
                <div className="relative hidden h-full w-1/2 xl:block">
                    <img className="absolute bottom-0 left-0 h-full object-contain object-bottom" src={homeimage2} />
                </div>
                <div className="w-full space-y-8 px-4 xl:w-1/2">
                    <h1 className="text-5xl text-left">Track your progress in a simple way</h1>
                    <p className="max-w-[60ch] text-2xl text-colord text-left">Check your learning progress and completed courses in your profile.</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Homepage;
