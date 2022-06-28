import GetItemOutput from "./get-item-output";

export default interface GetItemsQueryPresenter {
    present(items: GetItemOutput[]): void;
}