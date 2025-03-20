const { Skeleton } = require("@heroui/react");
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@heroui/react";

const ProductCardSkeleton = () => {
	return (
		<section>
			<div className="container">
				<div className="row gy-4">
					<div className="col-12 mx-auto">
						<div>
							<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
								{Array(10)
									.fill(0)
									.map((_, index) => {
										return (
											<div key={index}>
												<Skeleton>
													<div className="min-h-72 lg:min-h-72 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
												</Skeleton>
												<div className="flex flex-col justify-center items-center">
													<div className="mt-4 w-24 h-3 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
													<div className="mt-2 w-16 h-2 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductCardSkeleton;
