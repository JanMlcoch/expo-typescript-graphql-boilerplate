import React, {Component} from 'react';
import {ScrollView, Text, TouchableHighlight} from 'react-native';
import {Query, QueryResult} from 'react-apollo';
import {styles} from './styles';
import getPokemonMaxHPGraphql from 'getPokemonMaxHP.graphql';

interface GraphqlScreenState {
  randomNumber: number;
}

export default class GraphqlScreen extends Component<{}, GraphqlScreenState> {
  static navigationOptions = {
    title: 'Graphql',
  };

  state = {
    randomNumber: Math.random(),
  };

  changeNumber = () => {
    this.setState({
      randomNumber: Math.random(),
    })
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderQuery()}
        <Text>Random number: {this.state.randomNumber}</Text>
        <TouchableHighlight style={styles.button} onPress={this.changeNumber}>
          <Text>Change random number</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }

  renderQuery = () => {
    console.log('Rendering Pikachu query');
    const variables = {
      name: 'pikachu',
    };
    return (
      <Query query={getPokemonMaxHPGraphql} variables={variables} fetchPolicy={'no-cache'}>
        {this.renderQueryResult}
      </Query>
    );
  };

  renderQueryResult = ({data, loading}: QueryResult) => {
    // HERE: I got cached data here! You can see there is no request in reactotron
    console.log('New result', data && data.pokemon);
    if (loading) {
      return <Text>Pikachu maxHP: loading</Text>;
    }
    if (data && data.pokemon) {
      return <Text>Pikachu maxHP: {data.pokemon.maxHP}</Text>;
    }
    return null;
  };
}
